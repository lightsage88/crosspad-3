import axios from 'axios';

/**
 * @template M
 * @typedef DataStorageResponse
 * Creates a standard response of the data returned by a StashKu storage engine.
 * @property {Array.<M>} data - The data to be returned to the requesting caller.
 * @property {Number} [total=0] - The total number of objects available to the request. If not specified the count of data objects is used.
 * @property {Number} [affected=0] - The number of objects affected in storage.
 * @property {Number} [returned=0] - The number of objects returned from storage.
 * @property {Number} [code=200] - Optional status code to include as part of the response. If you are returning an
 * error, consider throwing a `RestError` instead.
*/

/**
 * @typedef DataStorageReadCriteria
 * @property {Array.<String>} [properties]
 * @property {Number} [skip]
 * @property {Number} [take]
 * @property {*} [filter]
 * @property {Array.<{field: String, dir: String}>} [sort]
 */

/**
 * @template T
 * @typedef {new(...args: Array) => T} Constructor
 **/

/**
 * A generic CRUDS data access layer that provides calls to the API server endpoints in a
 * standard way. 
 * @template M The model type (class).
 * @template I The model instance.
 */
class DataStorage {
    /**
     * Creates a new `DataStorage` instance.
     * @param {Constructor.<I> | M} modelType - The constructor model object (*not* an instance of the model).
     * @param {String} [baseURI="/"] - the base HTTP/S URI to utilize for calling the API server endpoint.
     */
    constructor(modelType, baseURI) {

        /**
         * @type {M}
         */
        this.modelType = modelType;

        /**
         * @type {String}
         */
        this.baseURI = baseURI || '/';

    }

    /**
     * Serializes the given object into a query paramater (URL) string.
     * @param {*} obj 
     * @param {*} prefix 
     * @returns {String}
     * @private
     */
    _paramSerialize(obj, prefix) {
        let str = [], p;
        for (p in obj) {
            if (typeof obj[p] !== 'undefined') {
                let k = prefix ? prefix + '[' + p + ']' : p,
                    v = obj[p];
                if (v !== null && typeof v === 'object') {
                    if (v instanceof Date) {
                        str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v.toISOString()));
                    } else {
                        str.push(this._paramSerialize(v, k));
                    }
                } else {
                    str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
            }
        }
        return str.join('&');
    }

    /**
     * Converts the response data from the server into proper model instances.
     * @param {DataStorageResponse.<I>} response - The response from the server.
     * @returns {DataStorageResponse.<I>}
     * @private
     */
    _transformResponse(response) {
        if (response && Array.isArray(response.data)) {
            for (let i = 0; i < response.data.length; i++) {
                try {
                    response.data[i] = new this.modelType(response.data[i]);
                } catch (err) {
                    throw new Error(`Attempting to transform model from server response on data item ${i} failed.\n` + err);
                }
            }
        }
        return response;
    }

    /**
     * Makes a request to the server to create the specified models.
     * @param  {...I} models - 0..n models to be created on the server.
     * @returns {DataStorageResponse.<I>}
     */
    async create(...models) {
        let axResponse = await axios.post(this.baseURI, models);
        return this._transformResponse(axResponse.data);
    }

    /**
     * Makes a request to the server to read models matching the specified criteria.
     * @param {DataStorageReadCriteria} criteria - The criteria to send to the server to retrieve results.
     * @returns {DataStorageResponse.<I>}
     */
    async read(criteria) {
        let params = this._paramSerialize(criteria);
        let axResponse = await axios.get(
            this.baseURI,
            {
                params: criteria,
                paramsSerializer: (params) => {
                    return this._paramSerialize(params);
                }
            }
        );
        return this._transformResponse(axResponse.data);
    }

    /**
     * Makes a request to the server to update the specified models.
     * @param  {...I} models - 0..n models to be updated on the server.
     * @returns {DataStorageResponse.<I>}
     */
    async update(...models) {
        let axResponse = await axios.put(this.baseURI, models);
        return this._transformResponse(axResponse.data);
    }

    /**
     * Makes a request to the server to delete the specified models.
     * @param  {...I} models - 0..n models to be deleted on the server.
     * @returns {DataStorageResponse.<I>}
     */
    async delete(...models) {
        let axResponse = await axios.delete(this.baseURI, { data: models });
        return this._transformResponse(axResponse.data);
    }

    /**
     * Makes a request to the server to create *or* update the specified models based on the
     * presence of a truthy `ID` property value per model.
     * @param  {...I} models - 0..n models to be updated on the server.
     * @returns {DataStorageResponse.<I>}
     */
    async save(...models) {
        let modelsToCreate = [];
        let modelsToUpdate = [];
        //seperate updates from creates
        for (let m of models) {
            if (m.ID) {
                modelsToCreate.push(m);
            } else {
                modelsToUpdate.push(m);
            }
        }
        //make calls for both
        let responses = await Promise.all([
            this.create(...modelsToCreate),
            this.update(...modelsToUpdate)
        ]);
        console.log(responses);
    }

}

export default DataStorage;
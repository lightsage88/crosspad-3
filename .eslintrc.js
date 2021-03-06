module.exports = {
    "env": {
        "es6": true,
        "jest": true,
        "node": true,
        "browser": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
      "$": true
    },
    "plugins": [
        "jest"
    ],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "react/no-unescaped-entities": "warn",
        "react/prop-types": "warn",
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1,
                "maxBOF": 1,
                "maxEOF": 1
            }
        ],
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "none",
                "ignoreRestSiblings": false,
                "caughtErrors": "none"
            }
        ],
        "no-console": [
            "warn"
        ],
        "valid-jsdoc": [
            "warn",
            {
                "requireReturnDescription": false,
                "requireReturn": false,
                "prefer": {
                    "return": "returns",
                    "virtual": "abstract"
                },
                "preferType": {
                    "Boolean": "Boolean",
                    "Number": "Number",
                    "object": "Object",
                    "String": "String"
                }
            }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "overrides": [
        {
            "files": [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            "env": {
                "jest": true
            }
        }
    ]
}
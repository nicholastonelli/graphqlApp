4# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@rails/actioncable", to: "actioncable.esm.js"
pin_all_from "app/javascript/channels", under: "channels"
#pin "graphql" # @16.11.0
#pin "graphql-ruby-client" # @1.14.8
pin "@apollo/client/cache", to: "@apollo--client--cache.js" # @4.0.4
pin "@apollo/client/core", to: "@apollo--client--core.js" # @4.0.4
pin "@apollo/client/errors", to: "@apollo--client--errors.js" # @4.0.4
pin "@apollo/client/incremental", to: "@apollo--client--incremental.js" # @4.0.4
pin "@apollo/client/link", to: "@apollo--client--link.js" # @4.0.4
pin "@apollo/client/link/client-awareness", to: "@apollo--client--link--client-awareness.js" # @4.0.4
pin "@apollo/client/link/http", to: "@apollo--client--link--http.js" # @4.0.4
pin "@apollo/client/link/utils", to: "@apollo--client--link--utils.js" # @4.0.4
pin "@apollo/client/masking", to: "@apollo--client--masking.js" # @4.0.4
pin "@apollo/client/utilities", to: "@apollo--client--utilities.js" # @4.0.4
pin "@apollo/client/utilities/environment", to: "@apollo--client--utilities--environment.js" # @4.0.4
pin "@apollo/client/utilities/internal", to: "@apollo--client--utilities--internal.js" # @4.0.4
pin "@apollo/client/utilities/internal/globals", to: "@apollo--client--utilities--internal--globals.js" # @4.0.4
pin "@apollo/client/utilities/invariant", to: "@apollo--client--utilities--invariant.js" # @4.0.4
pin "@babel/runtime/helpers/asyncToGenerator", to: "@babel--runtime--helpers--asyncToGenerator.js" # @7.28.4
pin "@babel/runtime/helpers/createForOfIteratorHelper", to: "@babel--runtime--helpers--createForOfIteratorHelper.js" # @7.28.4
pin "@babel/runtime/helpers/defineProperty", to: "@babel--runtime--helpers--defineProperty.js" # @7.28.4
pin "@babel/runtime/helpers/interopRequireDefault", to: "@babel--runtime--helpers--interopRequireDefault.js" # @7.28.4
pin "@babel/runtime/helpers/objectSpread2", to: "@babel--runtime--helpers--objectSpread2.js" # @7.28.4
pin "@babel/runtime/helpers/objectWithoutPropertiesLoose", to: "@babel--runtime--helpers--objectWithoutPropertiesLoose.js" # @7.28.4
pin "@babel/runtime/helpers/toConsumableArray", to: "@babel--runtime--helpers--toConsumableArray.js" # @7.28.4
pin "@babel/runtime/helpers/toPropertyKey", to: "@babel--runtime--helpers--toPropertyKey.js" # @7.28.4
pin "@wry/caches", to: "@wry--caches.js" # @1.0.1
pin "@wry/context", to: "@wry--context.js" # @0.7.4
pin "@wry/equality", to: "@wry--equality.js" # @0.5.7
pin "@wry/trie", to: "@wry--trie.js" # @0.5.0
pin "balanced-match" # @1.0.2
pin "brace-expansion" # @2.0.2
pin "buffer" # @2.1.0
pin "crypto" # @2.1.0
pin "fbjs/lib/areEqual", to: "fbjs--lib--areEqual.js" # @3.0.5
pin "fbjs/lib/warning", to: "fbjs--lib--warning.js" # @3.0.5
pin "fs" # @2.1.0
pin "glob" # @10.4.5
pin "graphql-tag" # @2.12.6
pin "graphql/language/printer", to: "graphql--language--printer.js" # @16.11.0
pin "http" # @2.1.0
pin "https" # @2.1.0
pin "invariant" # @2.2.4
pin "lru-cache" # @10.4.3
pin "minimatch" # @9.0.5
pin "minipass" # @7.1.2
pin "node:events" # @2.1.0
pin "node:fs" # @2.1.0
pin "node:fs/promises", to: "node:fs--promises.js" # @2.1.0
pin "node:path" # @2.1.0
pin "node:stream" # @2.1.0
pin "node:string_decoder" # @2.1.0
pin "node:url" # @2.1.0
pin "optimism" # @0.18.1
pin "path" # @2.1.0
pin "path-scurry" # @1.11.1
pin "process" # @2.1.0
pin "relay-runtime" # @20.1.1
pin "rxjs" # @7.8.2
pin "tslib" # @2.8.1
pin "url" # @2.1.0



pin "react", to: "https://esm.sh/react@19.1.0"
pin "react/", to: "https://esm.sh/react@19.1.0/"

pin "react-dom", to: "https://esm.sh/react-dom@19.1.0"
pin "react-dom/", to: "https://esm.sh/react-dom@19.1.0/"

pin "graphiql", to: "https://esm.sh/graphiql?standalone&external=react,react-dom,@graphiql/react,graphql"
pin "graphiql/", to: "https://esm.sh/graphiql/"

pin "@graphiql/plugin-explorer", to: "https://esm.sh/@graphiql/plugin-explorer?standalone&external=react,@graphiql/react,graphql"
pin "@graphiql/react", to: "https://esm.sh/@graphiql/react?standalone&external=react,react-dom,graphql,@graphiql/toolkit,@emotion/is-prop-valid"

pin "@graphiql/toolkit", to: "https://esm.sh/@graphiql/toolkit?standalone&external=graphql"
pin "graphql", to: "https://esm.sh/graphql@16.11.0"
pin "@emotion/is-prop-valid", to: "data:text/javascript,"

#pin "@rails/actioncable", to: "https://esm.sh/@rails/actioncable@8.0.201"

pin "graphql-ruby-client", to: "https://esm.sh/graphql-ruby-client@1.14.8"
pin "graphql-ruby-client/", to: "https://esm.sh/graphql-ruby-client@1.14.8/"
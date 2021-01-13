Feature: Template Tags Parsing

    Template tags needs to be rendered with Raw HTML in Stencil to avoid dom nodes being incorrectly added as children of the `template` instead of embedded in the `document-fragment`


    Scenario: Template tags are supported
        Given html
            """
            <div id="container"></div>

            <template id="template">
            <div>Click me</div>
            </template>
            """
        Then it's parsed and returned as
            """
            <div id="container"></div>

            <template id="template">
            <div>Click me</div>
            </template>
            """
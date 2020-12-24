Feature: Script Tags Parsing

    Script tags needs to be rendered with Raw HTML in Stencil to avoid dom nodes being incorrectly added as children of the `template` instead of embedded in the `document-fragment`


    Scenario: Script tags are supported
        Given html
            """
            <script type="application/json">
            {"foo":"bar"}
            </script>
            """
        Then it's parsed and returned as
            """
            <script type="application/json">
            {"foo":"bar"}
            </script>
            """
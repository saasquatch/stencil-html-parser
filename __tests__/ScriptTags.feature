Feature: Script Tags Parsing

    Script tags needs to be rendered with Raw HTML in Stencil to avoid dom nodes being added as children


    Scenario: JSON Script tags are supported
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

    Scenario: Javascript Script tags are supported and not evaluated
        Given html
            """
            <script>
            var foo = "bar";
            document.title="baz";
            </script>
            """
        Then it's parsed and returned as
            """
            <script>
            var foo = "bar";
            document.title="baz";
            </script>
            """
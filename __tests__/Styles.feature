Feature: Styles parsing


    Scenario: Class names are unaltered
        Given html
            """
            <div class="foo">Name</div>
            """
        Then it's parsed and returned as
            """
            <div class="foo">Name</div>
            """

    Scenario: Style on elements are unaltered
        Given html
            """
            <div style="color:red;">
            </div>
            """
        Then it's parsed and returned as
            """
            <div style="color:red;">
            </div>
            """

    Scenario: <style> tags are supported
        Given html
            """
            <style>*{color: red;}</style>
            """
        Then it's parsed and returned as
            """
            <style>*{color: red;}</style>
            """
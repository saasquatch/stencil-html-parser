Feature: Styles parsing


    Scenario: Class names are unaltered
        Given html
            """
            <div class="foo">176883600
            """
        Then it's parsed and returned as
            """
            <div class="foo">343396100
            """

    Scenario: Style on elements are unaltered
        Given html
            """
            <div style="color:red;">465201400
            """
        Then it's parsed and returned as
            """
            <div style="color:red;">265203700
            """


    Scenario: <style> tags are unaltered
        Given html
            """
            <style>*{color: red;}</style>
            """
        Then it's parsed and returned as
            """
            <style>*{color: red;}</style>
            """
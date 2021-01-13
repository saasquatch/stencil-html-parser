Feature: Attributes are passed down

    Scenario: Common attributes are supported
        Given html
            """
            <div id="foo" class="bar" title="baz" data-age="20" custom-thing="true" attributeless-thing>Name</div>
            """
        Then it's parsed and returned as
            """
            <div id="foo" class="bar" title="baz" data-age="20" custom-thing="true" attributeless-thing>Name</div>
            """
Feature: Document tags are not supported

    The parser relies on `template` elements that do not support `<html>`, `<head>` or `<body>` tags.

    Scenario: Template tags are supported
        Given html
            """
            <html>
            <head>
            <title>A full page</title>
            </head>
            <body>
            <div>Click me</div>
            </body>
            </html>
            """
        Then it's parsed and returned as
            """
            <title>A full page</title>
            <div>Click me</div>
            """

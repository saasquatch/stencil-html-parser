Feature: Supported HTML Elements

    Most standard HTML elements are supported.


    Scenario Outline: Standard tags are supported
        Given html
            """
            <tag>
            """
        Then it's parsed and returned as
            """
            <tag>
            """

        Examples:
            | tag                               |
            | <a></a>                           |
            | <abbr></abbr>                     |
            | <address></address>               |
            | <area></area>                     |
            | <article></article>               |
            | <aside></aside>                   |
            | <audio></audio>                   |
            | <b></b>                           |
            | <base></base>                     |
            | <bdi></bdi>                       |
            | <bdo></bdo>                       |
            | <big></big>                       |
            | <blockquote></blockquote>         |
            | <body></body>                     |
            | <br></br>                         |
            | <button></button>                 |
            | <canvas></canvas>                 |
            | <cite></cite>                     |
            | <code></code>                     |
            | <data></data>                     |
            | <datalist></datalist>             |
            | <dd></dd>                         |
            | <del></del>                       |
            | <details></details>               |
            | <dfn></dfn>                       |
            | <dialog></dialog>                 |
            | <div></div>                       |
            | <dl></dl>                         |
            | <dt></dt>                         |
            | <em></em>                         |
            | <embed></embed>                   |
            | <fieldset></fieldset>             |
            | <figcaption></figcaption>         |
            | <figure></figure>                 |
            | <footer></footer>                 |
            | <form></form>                     |
            | <h1></h1>                         |
            | <h2></h2>                         |
            | <h3></h3>                         |
            | <h4></h4>                         |
            | <h5></h5>                         |
            | <h6></h6>                         |
            | <head></head>                     |
            | <header></header>                 |
            | <hgroup></hgroup>                 |
            | <hr></hr>                         |
            | <html></html>                     |
            | <i></i>                           |
            | <iframe></iframe>                 |
            | <img></img>                       |
            | <input></input>                   |
            | <ins></ins>                       |
            | <kbd></kbd>                       |
            | <keygen></keygen>                 |
            | <label></label>                   |
            | <legend></legend>                 |
            | <li></li>                         |
            | <link></link>                     |
            | <main></main>                     |
            | <map></map>                       |
            | <mark></mark>                     |
            | <menu></menu>                     |
            | <menuitem></menuitem>             |
            | <meta></meta>                     |
            | <meter></meter>                   |
            | <nav></nav>                       |
            | <noscript></noscript>             |
            | <object></object>                 |
            | <ol></ol>                         |
            | <optgroup></optgroup>             |
            | <option></option>                 |
            | <output></output>                 |
            | <p></p>                           |
            | <param></param>                   |
            | <picture></picture>               |
            | <pre></pre>                       |
            | <progress></progress>             |
            | <q></q>                           |
            | <rp></rp>                         |
            | <rt></rt>                         |
            | <ruby></ruby>                     |
            | <s></s>                           |
            | <samp></samp>                     |
            | <script></script>                 |
            | <section></section>               |
            | <select></select>                 |
            | <small></small>                   |
            | <source></source>                 |
            | <span></span>                     |
            | <strong></strong>                 |
            | <style></style>                   |
            | <sub></sub>                       |
            | <summary></summary>               |
            | <sup></sup>                       |
            | <textarea></textarea>             |
            | <time></time>                     |
            | <title></title>                   |
            | <track></track>                   |
            | <u></u>                           |
            | <ul></ul>                         |
            | <var></var>                       |
            | <video></video>                   |
            | <wbr></wbr>                       |
            | <circle></circle>                 |
            | <clipPath></clipPath>             |
            | <defs></defs>                     |
            | <ellipse></ellipse>               |
            | <foreignObject></foreignObject>   |
            | <g></g>                           |
            | <image></image>                   |
            | <line></line>                     |
            | <linearGradient></linearGradient> |
            | <mask></mask>                     |
            | <path></path>                     |
            | <pattern></pattern>               |
            | <polygon></polygon>               |
            | <polyline></polyline>             |
            | <radialGradient></radialGradient> |
            | <rect></rect>                     |
            | <stop></stop>                     |
            | <svg></svg>                       |
            | <text></text>                     |
            | <tspan></tspan>                   |



    Scenario: Tables are supported
        Given html
            """
            <table>
            <colgroup>
            <col span="2" style="background-color:red">
            <col style="background-color:yellow">
            </colgroup>
            <caption>Monthly savings</caption>
            <thead></thead>
            <tr>
            <th>Month</th>
            <th>Savings</th>
            </tr>
            <tbody>
            <tr>
            <td>January</td>
            <td>$100</td>
            </tr>
            </tbody>
            <tfoot><tr><td colspan="2">Foot</td></tr></tfoot>
            </table>
            """
        Then it's parsed and returned as
            """
            <table>
            <colgroup>
            <col span="2" style="background-color:red">
            <col style="background-color:yellow">
            </colgroup>
            <caption>Monthly savings</caption>
            <thead></thead>
            <tr>
            <th>Month</th>
            <th>Savings</th>
            </tr>
            <tbody>
            <tr>
            <td>January</td>
            <td>$100</td>
            </tr>
            </tbody>
            <tfoot><tr><td colspan="2">Foot</td></tr></tfoot>
            </table>
            """

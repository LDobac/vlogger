"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[834],{7525:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---20-valid-parentheses\\">LeetCode - 20. Valid Parentheses</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/valid-parentheses/\\">LeetCode - 20. Valid Parentheses</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>문자열이 주어질 때 소괄호<code>()</code>, 중괄호<code>{}</code>, 대괄호<code>[]</code>가 올바른 순서로 잘 열리고 닫혔는지 확인하는 문제입니다.</p>\\n<p>난이도는 <code>EASY</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<p><a href=\\"https://github.com/LDobac/leetcode/tree/master/20.%20Valid%20Parentheses\\">My Solutions(Github)</a></p>\\n<h3 id=\\"solution---stack\\">Solution - Stack</h3>\\n<p>괄호는 늘 짝을 지어 닫혀야합니다. 또한 소괄호내에 또 소괄호가 열리거나, 다른 괄호내에 다른 괄호가 열리는 등 괄호가 중첩되기때문에 새로운 괄호가 열리면 해당 괄호에 짝인 닫힘 괄호가 등장하여야 합니다.</p>\\n<p>때문에 문자열을 순회하면서 가장 최근에 열린 괄호의 짝을 찾아야 하며, 해당 괄호의 짝을 찾고 나면 이전에 순회되었던 열린 괄호의 짝을 찾아야 합니다.</p>\\n<p>즉 FILO(First In Last Out)로 맨 처음에 순회되었던 괄호가 가장 나중에 닫혀야 합니다. 그러므로 이번 문제 풀이를 위해 스택 자료구조를 사용합니다.</p>\\n<pre><code class=\\"language-c++\\">stack&lt;<span class=\\"hljs-type\\">char</span>&gt; openBrackets;\\n</code></pre>\\n<p>C++ STL의 stack 자료구조를 선언합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">char</span> ch : s)\\n{\\n    ...\\n}\\n</code></pre>\\n<p>그리고 입력된 문자열을 순회합니다. 반복문 내에서 괄호가 올바르게 열렸고, 닫혔는지 확인합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (<span class=\\"hljs-string\\">&#x27;(&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;{&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;[&#x27;</span> == ch)\\n{\\n    openBrackets.<span class=\\"hljs-built_in\\">push</span>(ch);\\n}\\n</code></pre>\\n<p>처음으로는 열린 괄호를 확인합니다. 열린 괄호라면 스택에 삽입해 가장 최근에 삽입된(스택의 top) 열린 괄호의 짝인 닫힌 괄호를 찾습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> (<span class=\\"hljs-string\\">&#x27;)&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;}&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;]&#x27;</span> == ch)\\n{\\n    <span class=\\"hljs-keyword\\">if</span> (openBrackets.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n\\n    <span class=\\"hljs-type\\">char</span> openBracket = openBrackets.<span class=\\"hljs-built_in\\">top</span>();\\n\\n    <span class=\\"hljs-keyword\\">if</span> (\\n        !(\\n            (<span class=\\"hljs-string\\">&#x27;(&#x27;</span> == openBracket &amp;&amp; <span class=\\"hljs-string\\">&#x27;)&#x27;</span> == ch) || \\n            (<span class=\\"hljs-string\\">&#x27;{&#x27;</span> == openBracket &amp;&amp; <span class=\\"hljs-string\\">&#x27;}&#x27;</span> == ch) || \\n            (<span class=\\"hljs-string\\">&#x27;[&#x27;</span> == openBracket &amp;&amp; <span class=\\"hljs-string\\">&#x27;]&#x27;</span> == ch)\\n        )\\n    )\\n    {\\n        <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n    }\\n\\n    openBrackets.<span class=\\"hljs-built_in\\">pop</span>();\\n}\\n</code></pre>\\n<p>만약 닫힌 괄호라면 스택의 top을 가져와 가장 최근에 탐색된 열린 괄호와 짝인지 확인합니다. 만약 아니라면 함수는 false를 반환하며, 짝이라면 스택에서 해당 열린 괄호를 pop하고 계속 순회를 합니다.</p>\\n<p>닫힌 괄호가 등장했는데, 열린 괄호를 저장하는 스택의 크기가 0이라면 잘 못 닫힌 괄호이므로 즉시 함수는 false를 반환합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">return</span> openBrackets.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>;\\n</code></pre>\\n<p>모든 순회가 끝나고 나면 함수를 반환합니다. 단, 만약 스택의 크기가 0이 아니라면 정상적으로 닫히지 않은 괄호가 있는 뜻이니, false를 반환하도록 합니다.</p>\\n<p>추가적으로 자잘한 최적화를 위해서 함수의 시작 부분에 다음 구문을 추가하였습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (s.<span class=\\"hljs-built_in\\">size</span>() % <span class=\\"hljs-number\\">2</span> != <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n</code></pre>\\n<p>정상적으로 열리고 닫힌 괄호는 2개의 문자로 이루어졌으므로, 만약 입력된 문자열의 길이가 홀수라면 하나의 문자는 정상적으로 닫히거나 열리지 않았다는 의미가 됩니다.</p>\\n<p>그러므로 입력된 문자열의 길이가 홀수라면 즉시 false를 반환합니다.</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/20/result_1.png\\" alt=\\"Solution 1 result\\"></p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> \\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\"><span class=\\"hljs-type\\">bool</span> <span class=\\"hljs-title\\">isValid</span><span class=\\"hljs-params\\">(string s)</span> \\n    </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (s.<span class=\\"hljs-built_in\\">size</span>() % <span class=\\"hljs-number\\">2</span> != <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n\\n        stack&lt;<span class=\\"hljs-type\\">char</span>&gt; openBrackets;\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">char</span> ch : s)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (<span class=\\"hljs-string\\">&#x27;(&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;{&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;[&#x27;</span> == ch)\\n            {\\n                openBrackets.<span class=\\"hljs-built_in\\">push</span>(ch);\\n            }\\n            <span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> (<span class=\\"hljs-string\\">&#x27;)&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;}&#x27;</span> == ch || <span class=\\"hljs-string\\">&#x27;]&#x27;</span> == ch)\\n            {\\n                <span class=\\"hljs-keyword\\">if</span> (openBrackets.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n\\n                <span class=\\"hljs-type\\">char</span> openBracket = openBrackets.<span class=\\"hljs-built_in\\">top</span>();\\n\\n                <span class=\\"hljs-keyword\\">if</span> (\\n                    !(\\n                        (<span class=\\"hljs-string\\">&#x27;(&#x27;</span> == openBracket &amp;&amp; <span class=\\"hljs-string\\">&#x27;)&#x27;</span> == ch) || \\n                        (<span class=\\"hljs-string\\">&#x27;{&#x27;</span> == openBracket &amp;&amp; <span class=\\"hljs-string\\">&#x27;}&#x27;</span> == ch) || \\n                        (<span class=\\"hljs-string\\">&#x27;[&#x27;</span> == openBracket &amp;&amp; <span class=\\"hljs-string\\">&#x27;]&#x27;</span> == ch)\\n                    )\\n                )\\n                {\\n                    <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n                }\\n\\n                openBrackets.<span class=\\"hljs-built_in\\">pop</span>();\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> openBrackets.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>;\\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
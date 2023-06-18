"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[300],{1327:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---22-generate-parentheses\\">LeetCode - 22. Generate Parentheses</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/generate-parentheses/\\">LeetCode - 22. Generate Parentheses</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>정수 n이 주어지면 n개의 괄호로 이루어지는 모든 조합을 반환해야합니다.</p>\\n<p>예를 들어 n = 1이라면 <code>[&quot;()&quot;]</code>이며, </p>\\n<p>n = 2이라면 <code>[&quot;(())&quot;, &quot;()()&quot;]</code>, </p>\\n<p>그리고 n = 3이라면 <code>[&quot;((()))&quot;,&quot;(()())&quot;,&quot;(())()&quot;,&quot;()(())&quot;,&quot;()()()&quot;]</code>를 반환해야 합니다.</p>\\n<p>난이도는 <code>MEDIUM</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<p><a href=\\"https://github.com/LDobac/leetcode/tree/master/22.%20Generate%20Parentheses\\">My Solutions(Github)</a></p>\\n<h3 id=\\"solution-1---brute-force\\">Solution 1 - Brute force</h3>\\n<p>첫 번째 풀이 방법은 Brute force(무차별 대입)입니다. Brute force 방법은 풀이가 간단하기 때문에 한 번 시간 복잡도 Big-O만 계산하고 넘어가겠습니다.</p>\\n<p>먼저 n = 3인 경우에 대해서 모든 조합에 대한 트리를 구성해보겠습니다.</p>\\n<p><img src=\\"/assets/images/leet_code/22/example_1.png\\" alt=\\"Solution 1 result\\"></p>\\n<p>조합이 열린 괄호, 닫힌 괄호 두 가지이기 때문에 완전 이진 트리가 형성되었습니다. 단순히 Brute force를 한다면 트리를 탐색하면서 생기는 모든 조합이 탐색될 것입니다.</p>\\n<p>그렇다면 완전 이진 트리의 노드 수만큼의 순회가 발생하게 됩니다. 완전 <a href=\\"https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC\\">이진 트리는 2^h-1개의 노드</a>를 가질 수 있습니다.(여기서 h는 트리의 높이)</p>\\n<p>그러므로 n=3일때 트리의 높이는 h=4이므로 최소 O(2^n)으로 볼 수 있을 것 같습니다. 추가로 적절하지 않은 괄호의 형태도 모두 순회하니 이를 검사하는 시간 복잡도도 추가되어야 합니다.</p>\\n<h3 id=\\"solution-2---backtracking\\">Solution 2 - Backtracking</h3>\\n<p>이제 Backtracking 기법을 사용하여 Brute force 방법에서 적절한 괄호 쌍이 형성되지 않는 경로로는 탐색하지 않도록 하여 최적화를 시도해보겠습니다.</p>\\n<p>별도의 <code>open</code>, <code>close</code>변수를 선언합니다. <code>open</code> 변수는 현재 열린 괄호의 수, <code>close</code>변수는 닫힌 괄호의 수를 나타냅니다.</p>\\n<p>정상적으로 열리고 닫힌 괄호쌍이 형성될때는 항상 열린 괄호가 먼저 등장하고, 닫힌 괄호가 나중에 등장해야 합니다. </p>\\n<p>그리고 본 문제에서는 괄호의 수인 n이라는 값이 주어지므로, 열린 괄호의 수가 n개를 넘어서는 안됩니다. n개를 넘어서는 순간, n개 이상의 괄호가 형성되기 때문입니다.</p>\\n<p><img src=\\"/assets/images/leet_code/22/example_2.png\\" alt=\\"example 2\\"></p>\\n<p>이런식으로 현재 열린 괄호의 수보다 닫힌 괄호의 수가 커지는 경우에 대해서는 탐색하지 않고 다시 돌아갑니다.</p>\\n<p>또한 열린 괄호의 수가 n보다 커지는 경우도 모두 제외합니다.</p>\\n<p>코드로 이를 구현해보겠습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-function\\"><span class=\\"hljs-type\\">void</span> <span class=\\"hljs-title\\">generate</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">int</span> n, <span class=\\"hljs-type\\">int</span> open, <span class=\\"hljs-type\\">int</span> close, string s, vector&lt;string&gt;&amp; out)</span> </span>{...}\\n</code></pre>\\n<p>Backtracking으로 구현하기 위해 별도의 재귀함수를 선언합니다. 당연하지만, 일반적인 순회문으로도 충분히 구현 가능합니다.</p>\\n<p>open, close 변수는 위에서 설명되었으며, n는 괄호의 수, s는 현재까지 탐색된 괄호의 조합 문자열, out은 조합된 괄호의 출력입니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (open &lt; n)\\n{\\n    <span class=\\"hljs-built_in\\">generate</span>(n, open + <span class=\\"hljs-number\\">1</span>, close, s + <span class=\\"hljs-string\\">&#x27;(&#x27;</span>, out);\\n}\\n</code></pre>\\n<p>만약 열린 괄호의 수가 최대 괄호 개수보다 적다면 새로운 괄호를 열고 탐색을 계속합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (close &lt; open)\\n{\\n    <span class=\\"hljs-built_in\\">generate</span>(n, open, close + <span class=\\"hljs-number\\">1</span>, s + <span class=\\"hljs-string\\">&#x27;)&#x27;</span>, out);\\n}\\n</code></pre>\\n<p>현재 닫힌 괄호의 수가 열린 괄호의 수보다 적다면 괄호를 하나 닫고 계속 탐색합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (s.<span class=\\"hljs-built_in\\">length</span>() == n * <span class=\\"hljs-number\\">2</span>)\\n{\\n    out.<span class=\\"hljs-built_in\\">push_back</span>(s);\\n}\\n</code></pre>\\n<p>지금까지 조합된 괄호 문자열의 길이가 n*2라면 출력 배열에 삽입합니다. n * 2인 이유는 간단합니다. 입력 n은 괄호 쌍의 개수를 나타냅니다. 하나의 괄호쌍은 2개이기 때문에 만약 문자열의 길이가 n * 2이라면 n개의 괄호쌍이 모두 조합된거니 출력 배열에 삽입하면 됩니다.</p>\\n<p>이렇게 구현이 끝났습니다. 실질적인 구현 코드는 10줄 가량이 채 되지 않습니다. </p>\\n<p>항상 생각하지만, 생각은 몇십분 이상을 해도 구현 코드는 몇 줄이 되지 않을때마다 조금 현타가 오는 기분이기도 하고 뿌듯하기도 합니다.</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/22/result_1.png\\" alt=\\"Solution 1 result\\"></p>\\n<p>제출 표본이 적기때문에 100%는 큰 의미가 없지만, 실행 속도가 0ms가 나오게 되었기 때문에 충분히 좋은 알고리즘이 구현된 것 같습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> {\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">vector&lt;string&gt; <span class=\\"hljs-title\\">generateParenthesis</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">int</span> n)</span> </span>{\\n        vector&lt;string&gt; result;\\n\\n        <span class=\\"hljs-built_in\\">generate</span>(n, <span class=\\"hljs-number\\">0</span>, <span class=\\"hljs-number\\">0</span>, <span class=\\"hljs-string\\">&quot;&quot;</span>, result);\\n\\n        <span class=\\"hljs-keyword\\">return</span> result;\\n    }\\n\\n    <span class=\\"hljs-function\\"><span class=\\"hljs-type\\">void</span> <span class=\\"hljs-title\\">generate</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">int</span> n, <span class=\\"hljs-type\\">int</span> open, <span class=\\"hljs-type\\">int</span> close, string s, vector&lt;string&gt;&amp; out)</span>\\n    </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (s.<span class=\\"hljs-built_in\\">length</span>() == n * <span class=\\"hljs-number\\">2</span>)\\n        {\\n            out.<span class=\\"hljs-built_in\\">push_back</span>(s);\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (open &lt; n)\\n        {\\n            <span class=\\"hljs-built_in\\">generate</span>(n, open + <span class=\\"hljs-number\\">1</span>, close, s + <span class=\\"hljs-string\\">&#x27;(&#x27;</span>, out);\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (close &lt; open)\\n        {\\n            <span class=\\"hljs-built_in\\">generate</span>(n, open, close + <span class=\\"hljs-number\\">1</span>, s + <span class=\\"hljs-string\\">&#x27;)&#x27;</span>, out);\\n        }\\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
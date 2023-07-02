"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[219],{124:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---1-two-sum\\">LeetCode - 1. Two Sum</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/two-sum/\\">LeetCode 1. Two Sun</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>LeetCode의 1번 문제인 Two Sum은 정수형 배열과 target 숫자를 입력받습니다. 그리고 정수형 배열 내 숫자들을 이용해 target 숫자를 만들 수 있는 숫자 2개를 찾아 index를 반환하는 문제입니다.</p>\\n<p>답은 <strong>정확히 하나만</strong> 존재하며 같은 원소는 사용하지 않습니다.</p>\\n<p>난이도는 <code>EASY</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<h3 id=\\"solution-1---brute-force\\">Solution 1 - Brute force</h3>\\n<p>첫 번째로 떠올린 방법은 Brute force, 무차별 대입 방법입니다. 단순히 배열을 모두 순회하면서 두 숫자를 더했을 때 target 숫자와 동일한 index 두 개를 찾는 방법입니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> x = <span class=\\"hljs-number\\">0</span> ; x &lt; nums.<span class=\\"hljs-built_in\\">size</span>() ; x++)\\n{\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> y = x + <span class=\\"hljs-number\\">1</span> ; y &lt; nums.<span class=\\"hljs-built_in\\">size</span>() ; y++)\\n    {\\n        <span class=\\"hljs-type\\">int</span> sumResult = nums[x] + nums[y];\\n\\n        <span class=\\"hljs-keyword\\">if</span> (target == sumResult)\\n        {\\n            <span class=\\"hljs-keyword\\">return</span> std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{x, y};\\n        }\\n    }\\n\\n    <span class=\\"hljs-keyword\\">return</span> std::<span class=\\"hljs-built_in\\">vector</span>&lt;<span class=\\"hljs-type\\">int</span>&gt;();\\n}\\n</code></pre>\\n<p>정말 심플합니다. 단순히 이중 반복문을 이용하여 배열을 순회하면서 하나하나 덧셈하여 target과 동일한 결과의 index를 반환합니다.</p>\\n<p>다만 특별한점이라면 내부의 중첩된 반복문은 <code>x + 1</code>번째부터 시작하는데, 이는 문제에 적혀있던 같은 원소를 사용하지 않기 때문이며 그리고 숫자를 더할 때 <code>x + y</code>나 <code>y + x</code>의 결과는 동일하기 때문에 중복된 case를 수행하지 않게 하기 위함입니다.</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/two_sum/sol1_result.webp\\" alt=\\"Solution 1 result\\"></p>\\n<p>실행 시간은 <code>463ms</code> 메모리는 <code>9.9MB</code>사용하였다. 테스트 케이스가 55개밖에 안되는데 사실상 0.5초가량 걸렸습니다.</p>\\n<p>O(n^2)의 코드이기 때문에 그닥 빠른 알고리즘은 아니란걸 알 수 있습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n    \\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;vector&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;string&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;tuple&gt;</span></span>\\n\\n<span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span>\\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt; <span class=\\"hljs-title\\">Answer</span><span class=\\"hljs-params\\">(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target)</span>\\n    </span>{\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> x = <span class=\\"hljs-number\\">0</span> ; x &lt; nums.<span class=\\"hljs-built_in\\">size</span>() ; x++)\\n        {\\n            <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> y = x + <span class=\\"hljs-number\\">1</span> ; y &lt; nums.<span class=\\"hljs-built_in\\">size</span>() ; y++)\\n            {\\n                <span class=\\"hljs-type\\">int</span> sumResult = nums[x] + nums[y];\\n\\n                <span class=\\"hljs-keyword\\">if</span> (target == sumResult)\\n                {\\n                    <span class=\\"hljs-keyword\\">return</span> std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{x, y};\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> std::<span class=\\"hljs-built_in\\">vector</span>&lt;<span class=\\"hljs-type\\">int</span>&gt;();\\n    }\\n};\\n\\n\\n<span class=\\"hljs-function\\"><span class=\\"hljs-type\\">int</span> <span class=\\"hljs-title\\">main</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">void</span>)</span>\\n</span>{\\n    Solution sol;\\n\\n    std::vector&lt;std::tuple&lt;std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;, <span class=\\"hljs-type\\">int</span>&gt;&gt; problems {\\n        std::<span class=\\"hljs-built_in\\">make_tuple</span>(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{<span class=\\"hljs-number\\">2</span>, <span class=\\"hljs-number\\">7</span>, <span class=\\"hljs-number\\">11</span>, <span class=\\"hljs-number\\">15</span>}, <span class=\\"hljs-number\\">9</span>),\\n        std::<span class=\\"hljs-built_in\\">make_tuple</span>(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{<span class=\\"hljs-number\\">3</span>, <span class=\\"hljs-number\\">2</span> ,<span class=\\"hljs-number\\">4</span>}, <span class=\\"hljs-number\\">6</span>),\\n        std::<span class=\\"hljs-built_in\\">make_tuple</span>(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{<span class=\\"hljs-number\\">3</span>, <span class=\\"hljs-number\\">3</span>}, <span class=\\"hljs-number\\">6</span>)\\n    };\\n\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> problem : problems)\\n    {\\n        <span class=\\"hljs-keyword\\">auto</span> answer = sol.<span class=\\"hljs-built_in\\">Answer</span>(std::<span class=\\"hljs-built_in\\">get</span>&lt;<span class=\\"hljs-number\\">0</span>&gt;(problem), std::<span class=\\"hljs-built_in\\">get</span>&lt;<span class=\\"hljs-number\\">1</span>&gt;(problem));\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> num : answer)\\n        {\\n            std::cout &lt;&lt; num &lt;&lt; <span class=\\"hljs-string\\">&quot; &quot;</span>;\\n        }\\n        std::cout &lt;&lt; std::endl;\\n    }\\n\\n}\\n</code></pre>\\n</details>\\n\\n<h3 id=\\"solution-2---hash-table\\">Solution 2 - Hash table</h3>\\n<p><img src=\\"/assets/images/leet_code/two_sum/follow_up.webp\\" alt=\\"Follow-up\\"></p>\\n<p>첫 번째 해결책은 O(n^2)의 코드이므로 이보다 더 빠른 해결책을 제시해보겠습니다.</p>\\n<p>첫 번째 방법의 문제점은 중첩된 반복문의 사용이며, 하나의 x를 정해 target에 맞는 y를 계속 찾는 방법입니다. 즉, 반복문이 돌며 x가 바뀌면 이전에 계산했던 모든 <code>x + y</code>의 계산 결과는 없어지며 새로운 x를 정해 다시 y를 찾아가는 여행을 떠나야 되게 됩니다.</p>\\n<p>여기서 생각을 바꾸어 이전에 나왔던 x를 별도의 메모리에 저장하여 <code>diff = target - x</code>를 수행하여 <code>diff</code>에 해당 하는 값이 이전에 등장한 적이 있다면 <code>diff + x = target</code>이 되므로 결국 diff와 x의 index를 반환하면 됩니다. 이렇게 되면 순회가 단 한번만 발생하니 O(n)이 됩니다.</p>\\n<p>그런데 여기서 또 발생하는 문제점은 x를 메모리에 저장한 후에 diff와 동일한 값을 찾을 때 저장한 공간을 순회해야 합니다. 만약 1차원 배열이라면 O(n)의 순회 시간이 발생할 것이며 즉, 결국 O(n^2)랑 차이가 없게되죠.</p>\\n<p>이를 해결하기 위해 일반 배열이 아닌 Hash Table을 사용합니다. Hash table은 Hash 함수를 key를 hash화 하여 저장할 index를 계산해 저장하는 방식이기 때문에 탐색과 삽입이 O(1)이 됩니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-comment\\">//                num, index</span>\\nstd::unordered_map&lt;<span class=\\"hljs-type\\">int</span>, <span class=\\"hljs-type\\">int</span>&gt; table;\\n\\n<span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> x = <span class=\\"hljs-number\\">0</span> ; x &lt; nums.<span class=\\"hljs-built_in\\">size</span>() ; x++)\\n{\\n    <span class=\\"hljs-type\\">int</span> diff = target - nums[x];\\n\\n    <span class=\\"hljs-keyword\\">auto</span> search = table.<span class=\\"hljs-built_in\\">find</span>(diff);\\n    <span class=\\"hljs-keyword\\">if</span> (search != table.<span class=\\"hljs-built_in\\">end</span>())\\n    {\\n        <span class=\\"hljs-keyword\\">return</span> std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{x, search-&gt;second};\\n    }\\n\\n    table.<span class=\\"hljs-built_in\\">insert</span>(std::<span class=\\"hljs-built_in\\">make_pair</span>(nums[x], x));\\n}\\n\\n<span class=\\"hljs-keyword\\">return</span> std::<span class=\\"hljs-built_in\\">vector</span>&lt;<span class=\\"hljs-type\\">int</span>&gt;();\\n</code></pre>\\n<p>C++의 <a href=\\"https://en.cppreference.com/w/cpp/container/unordered_map\\">unordered_map</a>은 key-value형태의 컨테이너이며 상수 시간내에 삽입, 삭제, 탐색, 비교가 이루어지는 자료구조 즉, Hash table입니다.</p>\\n<p>먼저 <code>diff = target - nums[x]</code>를 통해 target에 x를 빼면 남는 값 diff가 이미 등장한 적이 있는지 확인합니다.\\n만약 있다면 등장했었던 그 값의 index와 현재 x의 index를 반환하기만 하면 됩니다.</p>\\n<p>매우 간단하지만, 기존의 O(n^2) 코드에 비교하면 O(n)이므로 속도 향상이 매우 많이 이루어졌을 것이라고 생각됩니다.</p>\\n<h4 id=\\"제출-결과-1\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/two_sum/sol2_result.webp\\" alt=\\"Solution 2 result\\"></p>\\n<p>기존의 약 <code>500ms</code>의 속도에서 <code>7ms</code>의 속도로 70배 가까이 향상되었습니다. 다만 별도의 저장 공간을 사용했기에 메모리의 크기가 <code>9.9MB</code>에서 <code>10.7MB</code>로 증가했습니다.</p>\\n<details>\\n    <summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;vector&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;string&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;tuple&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;unordered_map&gt;</span></span>\\n\\n<span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span>\\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt; <span class=\\"hljs-title\\">Answer</span><span class=\\"hljs-params\\">(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target)</span>\\n    </span>{\\n        <span class=\\"hljs-comment\\">//                num, index</span>\\n        std::unordered_map&lt;<span class=\\"hljs-type\\">int</span>, <span class=\\"hljs-type\\">int</span>&gt; table;\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> x = <span class=\\"hljs-number\\">0</span> ; x &lt; nums.<span class=\\"hljs-built_in\\">size</span>() ; x++)\\n        {\\n            <span class=\\"hljs-type\\">int</span> diff = target - nums[x];\\n\\n            <span class=\\"hljs-keyword\\">auto</span> search = table.<span class=\\"hljs-built_in\\">find</span>(diff);\\n            <span class=\\"hljs-keyword\\">if</span> (search != table.<span class=\\"hljs-built_in\\">end</span>())\\n            {\\n                <span class=\\"hljs-keyword\\">return</span> std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{x, search-&gt;second};\\n            }\\n\\n            table.<span class=\\"hljs-built_in\\">insert</span>(std::<span class=\\"hljs-built_in\\">make_pair</span>(nums[x], x));\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> std::<span class=\\"hljs-built_in\\">vector</span>&lt;<span class=\\"hljs-type\\">int</span>&gt;();\\n    }\\n};\\n\\n\\n<span class=\\"hljs-function\\"><span class=\\"hljs-type\\">int</span> <span class=\\"hljs-title\\">main</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">void</span>)</span>\\n</span>{\\n    Solution sol;\\n\\n    std::vector&lt;std::tuple&lt;std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;, <span class=\\"hljs-type\\">int</span>&gt;&gt; problems {\\n        std::<span class=\\"hljs-built_in\\">make_tuple</span>(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{<span class=\\"hljs-number\\">2</span>, <span class=\\"hljs-number\\">7</span>, <span class=\\"hljs-number\\">11</span>, <span class=\\"hljs-number\\">15</span>}, <span class=\\"hljs-number\\">9</span>),\\n        std::<span class=\\"hljs-built_in\\">make_tuple</span>(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{<span class=\\"hljs-number\\">3</span>, <span class=\\"hljs-number\\">2</span> ,<span class=\\"hljs-number\\">4</span>}, <span class=\\"hljs-number\\">6</span>),\\n        std::<span class=\\"hljs-built_in\\">make_tuple</span>(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;{<span class=\\"hljs-number\\">3</span>, <span class=\\"hljs-number\\">3</span>}, <span class=\\"hljs-number\\">6</span>)\\n    };\\n\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> problem : problems)\\n    {\\n        <span class=\\"hljs-keyword\\">auto</span> answer = sol.<span class=\\"hljs-built_in\\">Answer</span>(std::<span class=\\"hljs-built_in\\">get</span>&lt;<span class=\\"hljs-number\\">0</span>&gt;(problem), std::<span class=\\"hljs-built_in\\">get</span>&lt;<span class=\\"hljs-number\\">1</span>&gt;(problem));\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> num : answer)\\n        {\\n            std::cout &lt;&lt; num &lt;&lt; <span class=\\"hljs-string\\">&quot; &quot;</span>;\\n        }\\n        std::cout &lt;&lt; std::endl;\\n    }\\n\\n}\\n</code></pre>\\n</details>"}')}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["post-2021-11-29-leet-code-18-38"],{9232:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---18-4sum\\">LeetCode - 18. 4Sum</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/4sum/\\">LeetCode - 18. 4Sum</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>이전까지 <a href=\\"https://jaehee.dev/#/post/1\\">Two Sum</a>, <a href=\\"https://jaehee.dev/#/post/15\\">3 Sum</a> 과 같은 문제를 풀었습니다.</p>\\n<p>이번에는 4 Sum입니다. 숫자 배열이 주어지면 숫자 네 개를 더했을 때 target 숫자가 나타나는 모든 가지수를 찾는 문제입니다. </p>\\n<p>Two Sum은 Hash table 방식을 이용하여 풀었고, 3 Sum은 Two pointer 방식을 이용하여 풀었습니다. Two pointer 방식은 left를 가리키는 인덱스와 right 인덱스를 이용하여 target 숫자에 가까워지도록 left, right의 포인터를 조정하는 방식이였습니다.</p>\\n<p>3 Sum에서 Two pointer를 활용할 때 숫자 하나를 고정해놓고 left, right 포인터를 조정하는 방식으로 풀었습니다. 즉, 숫자 하나를 고정해놓고 Two Sum을 수행한 것과 동일합니다.</p>\\n<p>즉 4 Sum 또한 숫자 하나를 고정해놓고 3 Sum을 수행한다면 4 Sum의 결과를 얻을 수 있을 것입니다.</p>\\n<p>Leetcode의 Solution과 동일하게 이번에는 4 Sum을 딱 정해서 푸는 것이 아닌, k-Sum에 대해서 문제를 풀어보았습니다.</p>\\n<p>난이도는 <code>MEDIUM</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<p><a href=\\"https://github.com/LDobac/leetcode/tree/master/17.%20Letter%20Combinations%20of%20a%20Phone%20Number\\">My Solutions(Github)</a></p>\\n<h3 id=\\"solution---ksum\\">Solution - kSum</h3>\\n<p>이번에 풀어볼 방법은 3 Sum과 동일하게 Two pointer, 즉 left, right 포인터를 target에 가까운 숫자가 되도록 좁혀가는 방식을 사용할 것입니다. </p>\\n<p>Two pointer 방법이 가능한 이유는 주어진 숫자 배열이 정렬되어있기 때문에 left 포인터가 무조건 right 포인터가 가리키는 숫자보다 작거나 같게됩니다. 때문에 해당 방법을 사용할때는 무조건 주어진 숫자 배열을 정렬해야합니다.</p>\\n<pre><code class=\\"language-c++\\">vector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; <span class=\\"hljs-built_in\\">fourSum</span>(vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target) \\n{\\n    <span class=\\"hljs-built_in\\">sort</span>(nums.<span class=\\"hljs-built_in\\">begin</span>(), nums.<span class=\\"hljs-built_in\\">end</span>());\\n\\n    <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-built_in\\">kSum</span>(nums, target, <span class=\\"hljs-number\\">0</span>, <span class=\\"hljs-number\\">4</span>);\\n}\\n\\nvector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; <span class=\\"hljs-built_in\\">kSum</span>(vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target, <span class=\\"hljs-type\\">int</span> start, <span class=\\"hljs-type\\">int</span> k)\\n{\\n    ...\\n}\\n</code></pre>\\n<p>그리고 kSum으로 일반화한 함수를 호출하여 k = 4인 경우에 대해서 호출합니다.</p>\\n<p>앞서 설명했듯이 3 Sum은 숫자 하나를 고정하고 나머지 숫자들로 2 Sum을 수행하는 방식으로 설명할 수 있습니다.</p>\\n<p>동일하게 4 Sum 또한 숫자 하나를 고정하고 3 Sum을 호출하는 방법으로 결과를 구할 수 있습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> i = start; i &lt; nums.<span class=\\"hljs-built_in\\">size</span>(); i++)\\n{\\n    <span class=\\"hljs-keyword\\">if</span> (i != start &amp;&amp; nums[i - <span class=\\"hljs-number\\">1</span>] == nums[i]) <span class=\\"hljs-keyword\\">continue</span>;\\n\\n    <span class=\\"hljs-keyword\\">auto</span> subsets = <span class=\\"hljs-built_in\\">kSum</span>(nums, target - nums[i], i + <span class=\\"hljs-number\\">1</span>, k <span class=\\"hljs-number\\">-1</span>);\\n\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> subset : subsets)\\n    {\\n        subset.<span class=\\"hljs-built_in\\">push_back</span>(nums[i]);\\n\\n        result.<span class=\\"hljs-built_in\\">push_back</span>(subset);\\n    }\\n}\\n</code></pre>\\n<p>k - 1 Sum을 구하는 방법은 매우 간단하게 이루어집니다.</p>\\n<p>수 하나(여기선 nums[i])를 고정하고, 고정한 수를 제외하고 k - 1 Sum을 호출합니다. 즉, 재귀적으로 k Sum이 이루어지게 됩니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (i != start &amp;&amp; nums[i - <span class=\\"hljs-number\\">1</span>] == nums[i]) <span class=\\"hljs-keyword\\">continue</span>;\\n</code></pre>\\n<p>위 if문은 이전에 고정한 숫자와 현재 고정할 숫자가 같으면 스킵합니다. 이전과 똑같은 숫자를 고정하여 탐색하면 nums[i - 1]에 대한 subset을 탐색하기 때문입니다. 자세한 설명은 3 Sum을 참조하시면 좋습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> subset : subsets)\\n{\\n    subset.<span class=\\"hljs-built_in\\">push_back</span>(nums[i]);\\n\\n    result.<span class=\\"hljs-built_in\\">push_back</span>(subset);\\n}\\n</code></pre>\\n<p>k - 1 Sum으로 반환된 결과에 현재 고정한 숫자를 합쳐서 결과에 반영합니다.</p>\\n<p>만약 k=2가 된다면 twoSum을 호출하는게 맞겠죠</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (k == <span class=\\"hljs-number\\">2</span>)\\n{\\n    <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-built_in\\">twoSum</span>(nums, target, start);\\n}\\n</code></pre>\\n<p>twoSum 함수에 대해서는 여기서는 설명을 하지 않겠습니다. 3 Sum 게시글을 참고하시거나, 게시글 하단의 코드 전문을 보시면 확인할 수 있습니다.</p>\\n<p>이게 끝입니다. 지금까지 수행한 과정은 다음과 같습니다.</p>\\n<ol>\\n<li>입력 배열을 정렬한다.</li>\\n<li>kSum을 호출한다. (여기선 k=4)</li>\\n<li>k-1 Sum을 재귀적으로 호출한다.</li>\\n<li>k = 2일 경우 Two Sum을 호출한다.</li>\\n<li>Two Sum으로 반환된 결과에 고정된 숫자를 합쳐 반환한다. </li>\\n</ol>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/18/result_1.png\\" alt=\\"Solution 1 result\\"></p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> \\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    vector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; <span class=\\"hljs-built_in\\">fourSum</span>(vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target) \\n    {\\n        <span class=\\"hljs-built_in\\">sort</span>(nums.<span class=\\"hljs-built_in\\">begin</span>(), nums.<span class=\\"hljs-built_in\\">end</span>());\\n\\n        <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-built_in\\">kSum</span>(nums, target, <span class=\\"hljs-number\\">0</span>, <span class=\\"hljs-number\\">4</span>);\\n    }\\n\\n    vector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; <span class=\\"hljs-built_in\\">kSum</span>(vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target, <span class=\\"hljs-type\\">int</span> start, <span class=\\"hljs-type\\">int</span> k)\\n    {\\n        vector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; result;\\n\\n        <span class=\\"hljs-keyword\\">if</span> (start &gt;= nums.<span class=\\"hljs-built_in\\">size</span>())\\n        {\\n            <span class=\\"hljs-keyword\\">return</span> result;\\n        }\\n\\n        <span class=\\"hljs-type\\">int</span> average = target / k;\\n\\n        <span class=\\"hljs-keyword\\">if</span>  (nums[start] &gt; average || average &gt; nums.<span class=\\"hljs-built_in\\">back</span>()) \\n        {\\n            <span class=\\"hljs-keyword\\">return</span> result;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (k == <span class=\\"hljs-number\\">2</span>)\\n        {\\n            <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-built_in\\">twoSum</span>(nums, target, start);\\n        }\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> i = start; i &lt; nums.<span class=\\"hljs-built_in\\">size</span>(); i++)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (i != start &amp;&amp; nums[i - <span class=\\"hljs-number\\">1</span>] == nums[i]) <span class=\\"hljs-keyword\\">continue</span>;\\n\\n            <span class=\\"hljs-keyword\\">auto</span> subsets = <span class=\\"hljs-built_in\\">kSum</span>(nums, target - nums[i], i + <span class=\\"hljs-number\\">1</span>, k <span class=\\"hljs-number\\">-1</span>);\\n\\n            <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> subset : subsets)\\n            {\\n                subset.<span class=\\"hljs-built_in\\">push_back</span>(nums[i]);\\n\\n                result.<span class=\\"hljs-built_in\\">push_back</span>(subset);\\n            }\\n        }\\n        \\n        <span class=\\"hljs-keyword\\">return</span> result;\\n    }\\n\\n    vector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; <span class=\\"hljs-built_in\\">twoSum</span>(vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; nums, <span class=\\"hljs-type\\">int</span> target, <span class=\\"hljs-type\\">int</span> start)\\n    {\\n        vector&lt;vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&gt; result;\\n\\n        <span class=\\"hljs-type\\">int</span> left = start;\\n        <span class=\\"hljs-type\\">int</span> right = nums.<span class=\\"hljs-built_in\\">size</span>() - <span class=\\"hljs-number\\">1</span>;\\n\\n        <span class=\\"hljs-keyword\\">while</span> (left &lt; right)\\n        {\\n            <span class=\\"hljs-type\\">int</span> sum = nums[left] + nums[right];\\n\\n            <span class=\\"hljs-keyword\\">if</span> (sum &lt; target)\\n            {\\n                left++;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> (sum &gt; target)\\n            {\\n                right--;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                 result.<span class=\\"hljs-built_in\\">push_back</span>({nums[left], nums[right]});\\n\\n                left++;\\n                <span class=\\"hljs-keyword\\">while</span> (nums[left] == nums[left - <span class=\\"hljs-number\\">1</span>] &amp;&amp; left &lt; right) left++;\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> result;\\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
//# sourceMappingURL=post-2021-11-29-leet-code-18-38.d35b8012.js.map
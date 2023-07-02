"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[293],{5956:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---11-container-with-most-water\\">LeetCode - 11. Container With Most Water</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/container-with-most-water/\\">LeetCode 11. Container With Most Water</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p><img src=\\"/assets/images/leet_code/11/question_11.webp\\" alt=\\"challenge example\\"></p>\\n<p>배열에 순서대로 각 막대의 길이가 주어 질 때, 해당 막대 사이에 액체를 담을 때 가장 많이 담긴 양을 구하는 문제입니다.</p>\\n<p>난이도는 <code>MEDIUM</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<h3 id=\\"solution-1---brute-force\\">Solution 1 - Brute force</h3>\\n<p>첫 번째 방법은 먼저 간단히 Brute force, 무차별 대입을 통한 문제 풀이를 시도해보도록 하겠습니다.</p>\\n<p>중첩된 반복문을 사용해 두 막대를 선택해 가장 큰 크기를 선택합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-type\\">int</span> maxArea = <span class=\\"hljs-number\\">0</span>;\\n\\n<span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> i = <span class=\\"hljs-number\\">0</span>; i &lt; count - <span class=\\"hljs-number\\">1</span>; i++)\\n{\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> j = i; j &lt; count; j++)\\n    {\\n        <span class=\\"hljs-type\\">int</span> barHeight = std::<span class=\\"hljs-built_in\\">min</span>(height[i], height[j]);\\n        <span class=\\"hljs-type\\">int</span> barWidth = j - i;\\n\\n        <span class=\\"hljs-type\\">int</span> area = barWidth * barHeight;\\n\\n        <span class=\\"hljs-keyword\\">if</span> (area &gt; maxArea)\\n        {\\n            maxArea = area;\\n        }\\n    }\\n}\\n</code></pre>\\n<p>넓이를 구하기 위해서는 너비(width)와 높이(height)가 필요합니다. </p>\\n<p>두 막대의 높이가 같다면 둘 중 하나의 높이를 사용할 수 있지만, 만약 높이가 다를때 액체를 담는다고 상상하면 낮은쪽의 높이로 액체가 넘치게 되겠죠. 그러므로 둘 중 높이가 낮은쪽을 선택합니다.</p>\\n<p>너비도 간단히 구할 수 있습니다. 두 막대 사이의 거리를 계산합니다.ㄹ</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/11/result_1.webp\\" alt=\\"Solution 1 result\\"></p>\\n<p>중첩된 반복문을 사용하고 있기에 시간 복잡도는 O(n^2)의 성능을 보이게 됩니다. 아주 많은 입력이 주어졌을 때 시간 초과가 발생함을 확인할 수 있었습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n    \\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;vector&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;algorithm&gt;</span></span>\\n\\n<span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> \\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\"><span class=\\"hljs-type\\">int</span> <span class=\\"hljs-title\\">maxArea</span><span class=\\"hljs-params\\">(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; height)</span> \\n    </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (height.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">2</span>)\\n        {\\n            <span class=\\"hljs-keyword\\">return</span>  std::<span class=\\"hljs-built_in\\">min</span>(height[<span class=\\"hljs-number\\">0</span>], height[<span class=\\"hljs-number\\">1</span>]);\\n        }\\n\\n        <span class=\\"hljs-type\\">int</span> count = height.<span class=\\"hljs-built_in\\">size</span>();\\n\\n        <span class=\\"hljs-type\\">int</span> maxArea = <span class=\\"hljs-number\\">0</span>;\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> i = <span class=\\"hljs-number\\">0</span>; i &lt; count - <span class=\\"hljs-number\\">1</span>; i++)\\n        {\\n            <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">int</span> j = i; j &lt; count; j++)\\n            {\\n                <span class=\\"hljs-type\\">int</span> barHeight = std::<span class=\\"hljs-built_in\\">min</span>(height[i], height[j]);\\n                <span class=\\"hljs-type\\">int</span> barWidth = j - i;\\n\\n                <span class=\\"hljs-type\\">int</span> area = barWidth * barHeight;\\n\\n                <span class=\\"hljs-keyword\\">if</span> (area &gt; maxArea)\\n                {\\n                    maxArea = area;\\n                }\\n            }\\n        }\\n        \\n        <span class=\\"hljs-keyword\\">return</span> maxArea;\\n    }\\n};\\n</code></pre>\\n</details>\\n\\n<h3 id=\\"solution-2\\">Solution 2</h3>\\n<p>두 번째 방법은 첫 번째 방법에서 약간 개선하여 굳이 의미 없는 계산을 빼보도록 하겠습니다.</p>\\n<p>높이가 가장 큰 두 개의 막대를 선택한다 하더라도 너비가 너무 좁으면 다른 것보다 넓이가 작을 수도 있습니다.</p>\\n<p>때문에 맨 처음에는 가장 너비가 큰 상태인 첫 번째 막대와 마지막 막대를 선택합니다.</p>\\n<p><img src=\\"/assets/images/leet_code/11/selection_example_1.webp\\" alt=\\"Selection example\\"></p>\\n<p>여기서 넓이가 더 커질 수 있는 방법은 왼쪽의 막대가 더 높아진다면 넓이가 더 커질 것입니다. 즉, 오른쪽의 막대는 충분히 길지만, 왼쪽의 막대가 작기때문에 왼쪽 막대로는 기대치 이상의 넓이를 구할 수 없을 것 같습니다.</p>\\n<p>왼쪽 막대를 한 칸 오른쪽의 막대를 선택합니다.</p>\\n<p><img src=\\"/assets/images/leet_code/11/selection_example_2.webp\\" alt=\\"Selection example 2\\"></p>\\n<p>너비가 1 줄어들었지만, 높이가 너비 이상으로 증가했기 때문에 이전의 결과보다 더 증가하였습니다. </p>\\n<p>현재 상황으로는 오른쪽의 막대가 왼쪽 막대보다 높이가 낮기 때문에, 오른쪽의 막대가 더 길어진다면 넓이가 더 증가할 수 도 있을 것 같습니다. 오른쪽의 막대를 한 칸 왼쪽의 막대를 선택합니다.</p>\\n<p><img src=\\"/assets/images/leet_code/11/selection_example_3.webp\\" alt=\\"Selection example 3\\"></p>\\n<p>아쉽지만 오히려 넓이가 낮아졌습니다. 이유는 오른쪽의 막대가 왼쪽의 막대보다 높이가 낮기 때문입니다. 다시 한 번 왼쪽으로 이동합니다.</p>\\n<p><img src=\\"/assets/images/leet_code/11/selection_example_4.webp\\" alt=\\"Selection example 4\\"></p>\\n<p>이런방식으로 계속 순회하며 가장 넓이가 컸었던 값을 선택하면 됩니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-type\\">int</span> maxArea = <span class=\\"hljs-number\\">0</span>;\\n\\n<span class=\\"hljs-type\\">int</span> left = <span class=\\"hljs-number\\">0</span>;\\n<span class=\\"hljs-type\\">int</span> right = height.<span class=\\"hljs-built_in\\">size</span>() <span class=\\"hljs-number\\">-1</span>;\\n\\n<span class=\\"hljs-keyword\\">while</span> (left &lt; right)\\n{\\n    <span class=\\"hljs-type\\">int</span> area = std::<span class=\\"hljs-built_in\\">min</span>(height[left], height[right]) * (right - left);\\n\\n    maxArea = std::<span class=\\"hljs-built_in\\">max</span>(area, maxArea);\\n\\n    <span class=\\"hljs-keyword\\">if</span> (height[left] &lt; height[right]) left++;\\n    <span class=\\"hljs-keyword\\">else</span> right--; \\n}\\n\\n<span class=\\"hljs-keyword\\">return</span> maxArea;\\n</code></pre>\\n<p>이런 방식으로 순회를 하면 모든 경우를 검사하는 것이 아니기 때문에 최선의 값을 못 찾아 낼 수 있지 않을까? 라는 생각이 들었습니다.</p>\\n<p>하지만 조금만 생각하니 모든 경우를 검사하지 않더라도 최선의 경우가 나오는지 알 수 있었습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (height[left] &lt; height[right]) left++;\\n<span class=\\"hljs-keyword\\">else</span> right--; \\n</code></pre>\\n<p>한 쪽의 막대가 다른쪽의 막대보다 작으면 인덱스를 1 올리거나, 1을 내려 다음 막대를 선택합니다.</p>\\n<p>위 코드를 계속해서 실행하게되면 계속해서 두 막대가 경쟁하면서 가장 긴 막대를 선택하려고 시도하게 됩니다. 물론 높이가 가장 높은 두 막대를 선택하더라도 너비가 좁아 더 넓은 공간이 계산되지 않을 수 있습니다.</p>\\n<p>하지만, 결국 높은 막대를 선택하면 큰 넓이가 나올 수 있는 기대치가 있기 때문에 기대치가 있는 경우에 대해서만 검사하므로 이런 결과가 나오게 되게 됩니다.</p>\\n<h4 id=\\"제출-결과-1\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/11/result_2.webp\\" alt=\\"Solution 2 result\\"></p>\\n<p>시간 복잡도는 O(n)이며 실제 실행 시간은 76ms가 나오며 다른 C++ 제출자보다 91% 가량 좋은 성능을 보임을 알 수 있습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n    \\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;vector&gt;</span></span>\\n<span class=\\"hljs-meta\\">#<span class=\\"hljs-keyword\\">include</span> <span class=\\"hljs-string\\">&lt;algorithm&gt;</span></span>\\n\\n<span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> \\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\"><span class=\\"hljs-type\\">int</span> <span class=\\"hljs-title\\">maxArea</span><span class=\\"hljs-params\\">(std::vector&lt;<span class=\\"hljs-type\\">int</span>&gt;&amp; height)</span> \\n    </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (height.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">2</span>)\\n        {\\n            <span class=\\"hljs-keyword\\">return</span>  std::<span class=\\"hljs-built_in\\">min</span>(height[<span class=\\"hljs-number\\">0</span>], height[<span class=\\"hljs-number\\">1</span>]);\\n        }\\n\\n        <span class=\\"hljs-type\\">int</span> maxArea = <span class=\\"hljs-number\\">0</span>;\\n\\n        <span class=\\"hljs-type\\">int</span> left = <span class=\\"hljs-number\\">0</span>;\\n        <span class=\\"hljs-type\\">int</span> right = height.<span class=\\"hljs-built_in\\">size</span>() <span class=\\"hljs-number\\">-1</span>;\\n\\n        <span class=\\"hljs-keyword\\">while</span> (left &lt; right)\\n        {\\n            <span class=\\"hljs-type\\">int</span> area = std::<span class=\\"hljs-built_in\\">min</span>(height[left], height[right]) * (right - left);\\n\\n            maxArea = std::<span class=\\"hljs-built_in\\">max</span>(area, maxArea);\\n\\n            <span class=\\"hljs-keyword\\">if</span> (height[left] &lt; height[right]) left++;\\n            <span class=\\"hljs-keyword\\">else</span> right--; \\n        }\\n        \\n        <span class=\\"hljs-keyword\\">return</span> maxArea;\\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[335],{2014:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---23-merge-k-sorted-lists\\">LeetCode - 23. Merge k Sorted Lists</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/merge-k-sorted-lists/\\">LeetCode - 23. Merge k Sorted Lists</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>지난 <a href=\\"https://jaehee.dev/#/post/22\\">LeetCode - 21. Merge Two Sorted Lists</a> 문제의 확장 버전입니다.</p>\\n<p>정렬된 k개의 연결 리스트가 입력되면 모든 연결 리스트를 정렬된 하나의 연결리스트 반환합니다.</p>\\n<p>난이도는 <code>HARD</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<p><a href=\\"https://github.com/LDobac/leetcode/tree/master/23.%20Merge%20k%20Sorted%20Lists\\">My Solutions(Github)</a></p>\\n<h3 id=\\"solution-1---merge-one-by-one\\">Solution 1 - Merge one by one</h3>\\n<p>첫 번째 해결 방법은 <a href=\\"https://jaehee.dev/#/post/22\\">LeetCode - 21. Merge Two Sorted Lists</a>의 풀이 방법을 그대로 사용하여 풀어보겠습니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeKLists</span><span class=\\"hljs-params\\">(vector&lt;ListNode*&gt;&amp; lists)</span> </span>{\\n    <span class=\\"hljs-keyword\\">if</span> (lists.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n    ListNode* result = lists[<span class=\\"hljs-number\\">0</span>];\\n\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">size_t</span> i = <span class=\\"hljs-number\\">1</span>; i &lt; lists.<span class=\\"hljs-built_in\\">size</span>(); i++)\\n    {\\n        result = <span class=\\"hljs-built_in\\">mergeTwoLists</span>(result, lists[i]);\\n    }\\n\\n    <span class=\\"hljs-keyword\\">return</span> result;\\n}\\n</code></pre>\\n<p>단순히 두 연결 리스트를 병합하는 함수를 이용하여 하나하나씩 병합하여 k - 1번 순회하여 모든 연결 리스트를 연결합니다.</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/23/result_1.webp\\" alt=\\"Solution 1 result\\"></p>\\n<p>실행 속도는 296ms, 다른 C++ 제출자에 비해서 13% 정도의 성능밖에 나오지 않았습니다. 이에 대한 이유를 알기 위해 Big-O를 계산해보겠습니다.</p>\\n<p>각 연결리스트를 하나하나씩 더하기 때문에 <code>lists = {list_1, list_2, list_3 ... ,list_k}</code>가 있을 때, 각 리스트의 노드수의 평균을 n개라고 해보겠습니다.</p>\\n<p>그럼 처음 <code>merge(list_1, list_2)</code>를 수행할 때 O(n)의 시간 복잡도가 발생합니다(길이가 n인 리스트를 순회하므로). 그리고 반환된 리스트의 길이는 2n이 되겠죠. 이 리스트를 <code>list_1m2</code>라고 해보겠습니다.</p>\\n<p>그리고 <code>list_1m2</code>와 <code>list_3</code>에 대해서 <code>merge(list_1m2, list_3)</code>를 수행하면 O(2n)의 시간 복잡도가 발생합니다(길이가 2n, n인 리스트를 순회하므로 최악의 경우인 2n). 그럼 반환된 리스트 <code>list_1m3</code>은 길이가 3n이 됩니다.</p>\\n<p>이런식으로 k번째까지 쭉 더하면 발생하는 반복 횟수는 <code>n + 2n + 3n + ... + kn = n(1 + 2 + 3 + ... + k)</code>가 됩니다.</p>\\n<p>일반적으로 <code>1 + 2 + 3 + ... + k = k(k + 1)/2</code>로 계산할 수 있으니, <code>nk(k+1)/2</code>입니다. 따라서 O(kn^2)이 되게됩니다.</p>\\n<p>공간 복잡도는 입력 리스트에 관계 없이 하나의 포인터만 선언하므로 O(1)입니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> {\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeKLists</span><span class=\\"hljs-params\\">(vector&lt;ListNode*&gt;&amp; lists)</span> </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (lists.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        ListNode* result = lists[<span class=\\"hljs-number\\">0</span>];\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-type\\">size_t</span> i = <span class=\\"hljs-number\\">1</span>; i &lt; lists.<span class=\\"hljs-built_in\\">size</span>(); i++)\\n        {\\n            result = <span class=\\"hljs-built_in\\">mergeTwoLists</span>(result, lists[i]);\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> result;\\n    }\\n\\n    <span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeTwoLists</span><span class=\\"hljs-params\\">(ListNode* list1, ListNode* list2)</span> </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (!list1 &amp;&amp; !list2) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n        \\n        ListNode* mergedHead = <span class=\\"hljs-literal\\">nullptr</span>;\\n        ListNode* lastNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        ListNode* node1 = list1;\\n        ListNode* node2 = list2;\\n\\n        <span class=\\"hljs-keyword\\">while</span> (node1 &amp;&amp; node2)\\n        {\\n            ListNode* selectedNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n            <span class=\\"hljs-keyword\\">if</span> (node1-&gt;val &lt; node2-&gt;val)\\n            {\\n                selectedNode = node1;\\n                node1 = node1-&gt;next;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                selectedNode = node2;\\n                node2 = node2-&gt;next;\\n            }\\n\\n            <span class=\\"hljs-keyword\\">if</span> (mergedHead == <span class=\\"hljs-literal\\">nullptr</span>)\\n            {\\n                mergedHead = selectedNode;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                lastNode-&gt;next = selectedNode;\\n            }\\n\\n            lastNode = selectedNode;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (node1)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (!mergedHead)\\n            {\\n                mergedHead = node1;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = node1; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n                {\\n                    lastNode-&gt;next = node;\\n                    lastNode = node;\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (node2)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (!mergedHead)\\n            {\\n                mergedHead = node2;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = node2; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n                {\\n                    lastNode-&gt;next = node;\\n                    lastNode = node;\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> mergedHead;   \\n    }\\n};\\n</code></pre>\\n</details>\\n\\n<h3 id=\\"solution-2---prority-queue\\">Solution 2 - Prority Queue</h3>\\n<p>두 번째 풀이 방법은 우선 순위 큐, 혹은 Heap 자료 구조를 이용해 풀어보도록 하겠습니다.</p>\\n<p>우선 순위 큐(Heap)은 일반적으로 최대 혹은 최소 값을 빠르게 찾기 위해 사용되는 자료구조입니다.</p>\\n<p>현재 문제는 오름차순으로 정렬된 모든 리스트를 하나의 정렬된 리스트로 반환하는 문제이기 때문에 입력으로 주어진 모든 노드를 우선 순위 큐에 삽입하고 빼면서 하나의 리스트로 만든다면 문제를 해결할 수 있을것입니다.</p>\\n<p>풀이에 사용되는 언어가 C++이므로 C++ STL의 <a href=\\"https://en.cppreference.com/w/cpp/container/priority_queue\\">priority_queue</a> 자료구조를 사용하도록 합니다. 해당 자료구조에 대한 자세한 스펙은 연결된 링크를 참조해주세요.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">auto</span> cmp = [](ListNode* left, ListNode* right) {\\n    <span class=\\"hljs-keyword\\">return</span> left-&gt;val &gt; right-&gt;val;\\n};\\n\\npriority_queue&lt;ListNode*, vector&lt;ListNode*&gt;, <span class=\\"hljs-keyword\\">decltype</span>(cmp)&gt; <span class=\\"hljs-built_in\\">queue</span>(cmp);\\n</code></pre>\\n<p>우선 순위 큐를 선언하고 별도의 비교 함수를 전달하여 해당 우선 순위 큐가 오름차순(min-heap)으로 형성되도록 합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> &amp;&amp;head : lists)\\n{\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = head; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n    {\\n        queue.<span class=\\"hljs-built_in\\">push</span>(node);\\n    }\\n}\\n</code></pre>\\n<p>그리고 입력된 모든 노드를 큐에 삽입합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">while</span> (!queue.<span class=\\"hljs-built_in\\">empty</span>()) \\n{\\n    <span class=\\"hljs-keyword\\">auto</span> r = queue.<span class=\\"hljs-built_in\\">top</span>(); \\n    queue.<span class=\\"hljs-built_in\\">pop</span>();\\n\\n    <span class=\\"hljs-keyword\\">if</span> (!head) \\n    {\\n        head = r;\\n        tail = head;\\n        <span class=\\"hljs-keyword\\">continue</span>;\\n    }\\n\\n    tail-&gt;next = r;\\n    r-&gt;next = <span class=\\"hljs-literal\\">nullptr</span>;\\n    tail = r;\\n}\\n</code></pre>\\n<p>그리고 단순히 큐에서 하나씩 pop을 수행하면서 하나의 연결 리스트로 형성합니다.</p>\\n<h4 id=\\"제출-결과-1\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/23/result_2.webp\\" alt=\\"Solution 2 result\\"></p>\\n<p>실행 속도는 16ms, 97% 가량의 성능이 도출되었습니다. </p>\\n<p>우선 순위 큐에 경우 구현 방법에 따라 시간 복잡도가 약간씩 다르지만 보통 삽입은 O(1), 삭제는 O(logn)으로 도출됩니다. 따라서 k개의 리스트에 대해 삽입과 삭제를 하므로 O(klogn)로 계산할 수 있습니다.</p>\\n<p>다만, 공간 복잡도는 k개의 우선 순위 큐 공간이 필요하므로 O(k)가 되게됩니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> {\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeKLists</span><span class=\\"hljs-params\\">(vector&lt;ListNode*&gt;&amp; lists)</span> </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (lists.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        ListNode* head = <span class=\\"hljs-literal\\">nullptr</span>;\\n        ListNode* tail = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        <span class=\\"hljs-keyword\\">auto</span> cmp = [](ListNode* left, ListNode* right) {\\n            <span class=\\"hljs-keyword\\">return</span> left-&gt;val &gt; right-&gt;val;\\n        };\\n\\n        priority_queue&lt;ListNode*, vector&lt;ListNode*&gt;, <span class=\\"hljs-keyword\\">decltype</span>(cmp)&gt; <span class=\\"hljs-built_in\\">queue</span>(cmp);\\n\\n        <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> &amp;&amp;head : lists)\\n        {\\n            <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = head; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n            {\\n                queue.<span class=\\"hljs-built_in\\">push</span>(node);\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">while</span> (!queue.<span class=\\"hljs-built_in\\">empty</span>()) \\n        {\\n            <span class=\\"hljs-keyword\\">auto</span> r = queue.<span class=\\"hljs-built_in\\">top</span>(); \\n            queue.<span class=\\"hljs-built_in\\">pop</span>();\\n\\n            <span class=\\"hljs-keyword\\">if</span> (!head) \\n            {\\n                head = r;\\n                tail = head;\\n                <span class=\\"hljs-keyword\\">continue</span>;\\n            }\\n\\n            tail-&gt;next = r;\\n            r-&gt;next = <span class=\\"hljs-literal\\">nullptr</span>;\\n            tail = r;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> head;\\n    }\\n};\\n</code></pre>\\n</details>\\n\\n<h3 id=\\"solution-3---divide-and-conquer\\">Solution 3 - Divide and Conquer</h3>\\n<p>세 번째 방법은 분할 정복을 이용하여 성능은 최대한 유지하면서 공간 복잡도는 O(1)로 구현해보도록 하겠습니다.</p>\\n<p>구현 자체는 간단합니다. Solution 1과 동일하게 두 연결 리스트를 병합하는 함수를 이용합니다. 하지만, 병합하는 과정에서 분할 정복 기법을 이용하게 됩니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">auto</span> amount = lists.<span class=\\"hljs-built_in\\">size</span>();\\n<span class=\\"hljs-keyword\\">auto</span> interval = <span class=\\"hljs-number\\">1</span>;\\n<span class=\\"hljs-keyword\\">while</span> (interval &lt; amount)\\n{\\n    <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> i = <span class=\\"hljs-number\\">0</span>; i &lt; amount - interval; i += interval * <span class=\\"hljs-number\\">2</span>)\\n    {\\n        lists[i] = <span class=\\"hljs-built_in\\">mergeTwoLists</span>(lists[i], lists[i + interval]);\\n    }\\n    interval *= <span class=\\"hljs-number\\">2</span>;\\n}\\n</code></pre>\\n<h4 id=\\"제출-결과-2\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/23/result_3.webp\\" alt=\\"Solution 3 result\\">\\n실행 속도는 25ms로 Solution 2와 큰 차이가 없음을 확인할 수 있습니다. </p>\\n<p>공간 복잡도도 O(1)이기 때문에 시간 복잡도와 공간 복잡도를 아주 적절하게 Trade-off 한것입니다.</p>\\n<p>평균 노드 개수가 n인 k개의 연결 리스트를 분할 정복 기법으로 병합하는 경우의 Big-O를 계산해보겠습니다.</p>\\n<p><em>출처 : <a href=\\"https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kks227&logNo=220776241154\\">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=kks227&amp;logNo=220776241154</a></em></p>\\n<p><img src=\\"https://mblogthumb-phinf.pstatic.net/20160731_119/kks227_1469954954786CDXJ4_GIF/0721tree.gif?type=w2\\" alt=\\"example\\"></p>\\n<p>분할 정복은 문제를 일반적으로 m개씩 분해합니다(여기서는 2개씩 분해합니다). </p>\\n<p>이때 우리의 코드는 k개의 연결 리스트를 2개씩 분할해서 병합합니다. 최대로 분할 될 수 있는 단계는 logk(밑이 2인데 생략)이므로 분할의 시간 복잡도는 O(logk)입니다.</p>\\n<p>이때 k개가 있으므로 O(klogk)로 계산할 수 있습니다. 그리고 n개의 노드를 병합해야 하므로 O(n * klogk)의 시간 복잡도가 계산됩니다.</p>\\n<p>Solution 1의 시간 복잡도는 <code>O(kn^2)</code>이였는데 Solution 3의 시간 복잡도는 <code>O(n * klogk)</code>이므로 당연히 더 빠르게 실행됩니다.</p>\\n<p>실제로 손으로 하나씩 계산해보더라도 Solution 1의 순회의 경우 n + 2n + 3n + ...으로 병합한 두 연결 리스트의 결과인 2n에 대해서 또 병합을 하니 위와 같은 결과가 나오게 됩니다.</p>\\n<p>하지만 Solution 3의 경우 (n + n), (n + n)... (2n + 2n), (2n + 2n)... (4n + 4n), ... 과 같이 분할된게 합쳐지면서 병합되기 때문에 최악의 경우가 nlogn밖에 되지 않습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> {\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeKLists</span><span class=\\"hljs-params\\">(vector&lt;ListNode*&gt;&amp; lists)</span> </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (lists.<span class=\\"hljs-built_in\\">size</span>() == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        <span class=\\"hljs-keyword\\">auto</span> amount = lists.<span class=\\"hljs-built_in\\">size</span>();\\n        <span class=\\"hljs-keyword\\">auto</span> interval = <span class=\\"hljs-number\\">1</span>;\\n        <span class=\\"hljs-keyword\\">while</span> (interval &lt; amount)\\n        {\\n            <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> i = <span class=\\"hljs-number\\">0</span>; i &lt; amount - interval; i += interval * <span class=\\"hljs-number\\">2</span>)\\n            {\\n                lists[i] = <span class=\\"hljs-built_in\\">mergeTwoLists</span>(lists[i], lists[i + interval]);\\n            }\\n            interval *= <span class=\\"hljs-number\\">2</span>;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> lists[<span class=\\"hljs-number\\">0</span>];\\n    }\\n\\n    <span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeTwoLists</span><span class=\\"hljs-params\\">(ListNode* list1, ListNode* list2)</span> </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (!list1 &amp;&amp; !list2) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n        \\n        ListNode* mergedHead = <span class=\\"hljs-literal\\">nullptr</span>;\\n        ListNode* lastNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        ListNode* node1 = list1;\\n        ListNode* node2 = list2;\\n\\n        <span class=\\"hljs-keyword\\">while</span> (node1 &amp;&amp; node2)\\n        {\\n            ListNode* selectedNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n            <span class=\\"hljs-keyword\\">if</span> (node1-&gt;val &lt; node2-&gt;val)\\n            {\\n                selectedNode = node1;\\n                node1 = node1-&gt;next;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                selectedNode = node2;\\n                node2 = node2-&gt;next;\\n            }\\n\\n            <span class=\\"hljs-keyword\\">if</span> (mergedHead == <span class=\\"hljs-literal\\">nullptr</span>)\\n            {\\n                mergedHead = selectedNode;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                lastNode-&gt;next = selectedNode;\\n            }\\n\\n            lastNode = selectedNode;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (node1)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (!mergedHead)\\n            {\\n                mergedHead = node1;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = node1; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n                {\\n                    lastNode-&gt;next = node;\\n                    lastNode = node;\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (node2)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (!mergedHead)\\n            {\\n                mergedHead = node2;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = node2; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n                {\\n                    lastNode-&gt;next = node;\\n                    lastNode = node;\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> mergedHead;   \\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
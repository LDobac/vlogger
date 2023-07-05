"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[657],{8344:function(e){e.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---21-merge-two-sorted-lists\\">LeetCode - 21. Merge Two Sorted Lists</h2>\\n<p>문제 - <a href=\\"https://github.com/LDobac/leetcode/tree/master/21.%20Merge%20Two%20Sorted%20Lists\\">LeetCode - 21. Merge Two Sorted Lists</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>오름차순으로 정렬된 두 연결 리스트가 입력으로 들어옵니다.</p>\\n<p>단순히 두 연결 리스트를 오름차순으로 하나의 연결 리스트로 합쳐 반환하면 됩니다.</p>\\n<p><img src=\\"/assets/images/leet_code/21/merge_ex1.webp\\" alt=\\"example\\"></p>\\n<p>난이도는 <code>EASY</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<p><a href=\\"https://github.com/LDobac/leetcode/tree/master/14.%20Longest%20Common%20Prefix\\">My Solutions(Github)</a></p>\\n<h3 id=\\"solution\\">Solution</h3>\\n<p>EASY 난이도인 만큼 크게 어려운 문제는 아닙니다.</p>\\n<p>두 연결 리스트를 순회하면서 크기가 작은 노드를 골라(오름차순으로 연결해야 하니) 새로운 연결 리스트에 연결해주면 됩니다.</p>\\n<pre><code class=\\"language-c++\\">ListNode* mergedHead = <span class=\\"hljs-literal\\">nullptr</span>;\\nListNode* lastNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\nListNode* node1 = list1;\\nListNode* node2 = list2;\\n</code></pre>\\n<p>먼저 새로운 연결 리스트의 head 포인터인 <code>mergedHead</code>포인터를 선언하고, 일종의 tail 포인터 역할을 맡는 <code>lastNode</code>포인터를 선언합니다.</p>\\n<p>새로운 연결 리스트를 구성할때는 항상 마지막에 노드를 삽입해야하기 때문에 별도의 tail 포인터를 사용합니다.</p>\\n<p>그리고 입력된 두 연결 리스트의 순회를 위해 <code>node1</code>, <code>node2</code> 포인터를 선언하여 초기화합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">while</span> (node1 &amp;&amp; node2)\\n{ ... }\\n</code></pre>\\n<p>이제 두 리스트를 동시에 순회합니다. 두 리스트의 노드의 크기를 비교해야 하기 때문에 동시에 순회하여야 합니다.</p>\\n<p>만약 한 쪽 리스트의 노드가 남는다면, 어차피 정렬되어있는 리스트이기때문에 그대로 붙이기만 하면 됩니다.</p>\\n<pre><code class=\\"language-c++\\">ListNode* selectedNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n<span class=\\"hljs-keyword\\">if</span> (node1-&gt;val &lt; node2-&gt;val)\\n{\\n    selectedNode = node1;\\n    node1 = node1-&gt;next;\\n}\\n<span class=\\"hljs-keyword\\">else</span>\\n{\\n    selectedNode = node2;\\n    node2 = node2-&gt;next;\\n}\\n\\n<span class=\\"hljs-keyword\\">if</span> (mergedHead == <span class=\\"hljs-literal\\">nullptr</span>)\\n{\\n    mergedHead = selectedNode;\\n}\\n<span class=\\"hljs-keyword\\">else</span>\\n{\\n    lastNode-&gt;next = selectedNode;\\n}\\n\\nlastNode = selectedNode;\\n</code></pre>\\n<p>while loop문의 내부 코드입니다.</p>\\n<pre><code class=\\"language-c++\\">ListNode* selectedNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n<span class=\\"hljs-keyword\\">if</span> (node1-&gt;val &lt; node2-&gt;val)\\n{\\n    selectedNode = node1;\\n    node1 = node1-&gt;next;\\n}\\n<span class=\\"hljs-keyword\\">else</span>\\n{\\n    selectedNode = node2;\\n    node2 = node2-&gt;next;\\n}\\n</code></pre>\\n<p>첫 번째로는 새로운 연결 리스트에 붙일 노드를 선택합니다. 새로운 연결 리스트도 오름차순으로 정렬되어서 반환되어야 하기때문에 두 노드 중 크기가 작은 노드를 선택합니다.</p>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">if</span> (mergedHead == <span class=\\"hljs-literal\\">nullptr</span>)\\n{\\n    mergedHead = selectedNode;\\n}\\n<span class=\\"hljs-keyword\\">else</span>\\n{\\n    lastNode-&gt;next = selectedNode;\\n}\\n</code></pre>\\n<p>그리고 노드를 새로운 연결 리스트에 삽입합니다. 만약 새 연결 리스트의 head가 nullptr라면 첫 순회이니 그냥 삽입하고, 아니라면 tail 노드의 next 포인터로 가리키게 합니다.</p>\\n<pre><code class=\\"language-c++\\">lastNode = selectedNode;\\n</code></pre>\\n<p>그리고 방금 삽입한 노드를 tail 포인터에 저장합니다.</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/21/result_01.webp\\" alt=\\"Solution 1 result\\"></p>\\n<p>실행 속도는 4ms가 나왔으며, 다른 C++ 제출자에 비해 95% 가량의 속도가 나왔습니다. </p>\\n<p>크게 어려운 문제는 아니기 때문에 다행이 충분히 만족하는 속도가 도출되었습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> {\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\">ListNode* <span class=\\"hljs-title\\">mergeTwoLists</span><span class=\\"hljs-params\\">(ListNode* list1, ListNode* list2)</span> </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (!list1 &amp;&amp; !list2) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">nullptr</span>;\\n        \\n        ListNode* mergedHead = <span class=\\"hljs-literal\\">nullptr</span>;\\n        ListNode* lastNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n        ListNode* node1 = list1;\\n        ListNode* node2 = list2;\\n\\n        <span class=\\"hljs-keyword\\">while</span> (node1 &amp;&amp; node2)\\n        {\\n            ListNode* selectedNode = <span class=\\"hljs-literal\\">nullptr</span>;\\n\\n            <span class=\\"hljs-keyword\\">if</span> (node1-&gt;val &lt; node2-&gt;val)\\n            {\\n                selectedNode = node1;\\n                node1 = node1-&gt;next;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                selectedNode = node2;\\n                node2 = node2-&gt;next;\\n            }\\n\\n            <span class=\\"hljs-keyword\\">if</span> (mergedHead == <span class=\\"hljs-literal\\">nullptr</span>)\\n            {\\n                mergedHead = selectedNode;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                lastNode-&gt;next = selectedNode;\\n            }\\n\\n            lastNode = selectedNode;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (node1)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (!mergedHead)\\n            {\\n                mergedHead = node1;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = node1; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n                {\\n                    lastNode-&gt;next = node;\\n                    lastNode = node;\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">if</span> (node2)\\n        {\\n            <span class=\\"hljs-keyword\\">if</span> (!mergedHead)\\n            {\\n                mergedHead = node2;\\n            }\\n            <span class=\\"hljs-keyword\\">else</span>\\n            {\\n                <span class=\\"hljs-keyword\\">for</span> (<span class=\\"hljs-keyword\\">auto</span> node = node2; node != <span class=\\"hljs-literal\\">nullptr</span>; node = node-&gt;next)\\n                {\\n                    lastNode-&gt;next = node;\\n                    lastNode = node;\\n                }\\n            }\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> mergedHead;   \\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
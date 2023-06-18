"use strict";(self["webpackChunkvlogger"]=self["webpackChunkvlogger"]||[]).push([[422],{4812:function(s){s.exports=JSON.parse('{"content":"<h2 id=\\"leetcode---9-palindrome-number\\">LeetCode - 9. Palindrome Number</h2>\\n<p>문제 - <a href=\\"https://leetcode.com/problems/palindrome-number/\\">LeetCode 9. Palindrome Number</a></p>\\n<h2 id=\\"문제-설명\\">문제 설명</h2>\\n<p>정수형 입력값이 회문인지 검사합니다. 만약 121이 입력된다면 121을 뒤집은 값도 121이니 회문입니다.</p>\\n<p>만약 -121이 들어온다면 뒤집었을 때 121-가 되므로 회문이 아닙니다. 123 또한 뒤집었을 때 321이 되므로 회문이 아닙니다.</p>\\n<p>난이도는 <code>EASY</code> 난이도 입니다.</p>\\n<h2 id=\\"풀이\\">풀이</h2>\\n<h3 id=\\"solution\\">Solution</h3>\\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-function\\"><span class=\\"hljs-type\\">bool</span> <span class=\\"hljs-title\\">isPalindrome</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">int</span> x)</span> \\n</span>{\\n    <span class=\\"hljs-keyword\\">if</span> (x &lt; <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n    <span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> (x &lt; <span class=\\"hljs-number\\">10</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">true</span>;\\n    <span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> ((x % <span class=\\"hljs-number\\">10</span>) == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n\\n    <span class=\\"hljs-type\\">long</span> reverse = <span class=\\"hljs-number\\">0</span>;\\n    <span class=\\"hljs-type\\">long</span> tmpX = x;\\n\\n    <span class=\\"hljs-keyword\\">while</span> (tmpX)\\n    {\\n        reverse = (reverse * <span class=\\"hljs-number\\">10</span>) + (tmpX % <span class=\\"hljs-number\\">10</span>);\\n        tmpX /= <span class=\\"hljs-number\\">10</span>;\\n    }\\n\\n    <span class=\\"hljs-keyword\\">return</span> reverse == x;\\n}\\n</code></pre>\\n<p>먼저 음수인 경우 절대 회문이 될 수 없기 때문에 <code>false</code>를 반환합니다.</p>\\n<p>숫자가 한 자리인 경우는 무조건 회문이기 때문에 <code>true</code>를 반환합니다.</p>\\n<p>10의 배수는 10, 20, ... 120, 130 등 회문이 절대 될 수 없기 때문에 <code>false</code>를 반환합니다.</p>\\n<p>입력값 x를 뒤집은 값 reverse를 구합니다. reverse의 타입이 <code>long</code>인 이유는 x값이 <code>int</code>자료형의 최대값이 들어오는 경우 뒤집을 때 연산 중 에러가 발생하기 때문에 <code>int</code>보다 큰 자료형인 <code>long</code> 자료형을 사용합니다.(별도의 자료형 제한을 두지 않았기 때문에 사용하였습니다.)</p>\\n<h4 id=\\"제출-결과\\">제출 결과</h4>\\n<p><img src=\\"/assets/images/leet_code/9/result.png\\" alt=\\"Solution 1 result\\"></p>\\n<p>0ms의 실행 결과가 표현되었으며, 다른 C++ 제출자보다 100%의 성능을 보였음을 확인할 수 있습니다.</p>\\n<details>\\n<summary>코드 전문</summary>\\n    \\n<pre><code class=\\"language-c++\\"><span class=\\"hljs-keyword\\">class</span> <span class=\\"hljs-title class_\\">Solution</span> \\n{\\n<span class=\\"hljs-keyword\\">public</span>:\\n    <span class=\\"hljs-function\\"><span class=\\"hljs-type\\">bool</span> <span class=\\"hljs-title\\">isPalindrome</span><span class=\\"hljs-params\\">(<span class=\\"hljs-type\\">int</span> x)</span> \\n    </span>{\\n        <span class=\\"hljs-keyword\\">if</span> (x &lt; <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n        <span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> (x &lt; <span class=\\"hljs-number\\">10</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">true</span>;\\n        <span class=\\"hljs-keyword\\">else</span> <span class=\\"hljs-keyword\\">if</span> ((x % <span class=\\"hljs-number\\">10</span>) == <span class=\\"hljs-number\\">0</span>) <span class=\\"hljs-keyword\\">return</span> <span class=\\"hljs-literal\\">false</span>;\\n\\n        <span class=\\"hljs-type\\">long</span> reverse = <span class=\\"hljs-number\\">0</span>;\\n        <span class=\\"hljs-type\\">long</span> tmpX = x;\\n\\n        <span class=\\"hljs-keyword\\">while</span> (tmpX)\\n        {\\n            reverse = (reverse * <span class=\\"hljs-number\\">10</span>) + (tmpX % <span class=\\"hljs-number\\">10</span>);\\n            tmpX /= <span class=\\"hljs-number\\">10</span>;\\n        }\\n\\n        <span class=\\"hljs-keyword\\">return</span> reverse == x;\\n    }\\n};\\n</code></pre>\\n</details>\\n"}')}}]);
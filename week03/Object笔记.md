Object
<结构化编程>
<对象本身不是数据存储的工具，作为结构体可作为数据存储工具>
任何对象都是唯一的，与其本身状态无关；
因此，即使状态完全一致的两个对象，也并不相等；
我们用状态描述对象；
状态的改变即行为；

唯一标识性
状态
行为

概念误区
封装<工程化概念> 解耦 内聚 复用
继承<面向对象的子系统>
多态<描述动态性程度>

面向对象范式：
Object-Class
归类（多重继承 C++ 菱形继承）、分类（单继承 Java mixin、Interface）

Object-Prototype
原型是更接近人类原始认知的描述对象的方法，通过“相似性”描述对象
任何对象仅仅需要描述它自己与原型的区别即可
Object.Prototype -> Nihilo

“行为改变对象”

《面向对象分析与设计》

Object in JavaScript
属性和原型

Symbol      Data
        => 
String      Accessor

数据属性描述状态，访问器属性描述行为
Data Property
<Attribute>
[[value]]
writable
enumerable
configurable

Accessor Property
<Attribute>
get
set
enumerable
configurable

数据属性中如果存储函数，也可以描述行为

原型链

ObjectAPI/Grammar
{} . [] Object.defineProperty *基本对象能力*
Object.create/Object.setPrototypeOf/Object.getPrototypeOf
new/class/extends
new/function/prototype

Function Object
[[call]]
函数对象中包含一个call内部属性

Special Object

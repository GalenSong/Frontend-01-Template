# Statement

Grammar
简单语句
ExpressionStatement
EmptyStatement
DebuggerStatement
ThrowStatement
ContinueStatement
BreakStatement
ReturnStatement

组合语句
BlockStatement
{
    
}
<对象不允许出现在表达式开头>
[[type]]: normal

Iteration
while()
do{}while()
for( ; ; )
for( in )
for( of )
for of => Iterator => Generator/Array
<for语句作用域 { { } }>

标签、循环、break、continue
LabelledStatement
IterationStatement
ContinueStatement
BreakStatement
SwitchStatement

try
try {
    throw 
} catch() {
    
} finally {
    
}
<catch() 不单独产生作用域，与其后的{}作用域一致>
[[type]]: return
[[value]]: --
[[target]]: label

<可以抛出异常或产生错误的方式: 任何可以产生运行时异常的逻辑>
作用域：源代码中的范围
上下文：用户环境中的变量存储区域

声明

FunctionDeclaration
函数声明、函数表达式

GeneratorDeclaration
void async function(){
    var i = 0;
    while(true) {
        console.log(i++)
        await sleep(1000)
    }
}
function sleep(d) {
    return new Promise(resolve => setTimeout(resolve, d))
}

AsyncFunctionDeclaration
AsyncGeneratorDeclaration
VariableStatement
<任何var声明不建议放在子结构中，应该放在函数作用域最前面>
ClassDeclaration
LexicalDeclaration

Runtime
Completion Record <内部类型>
[[type]]: normal, break, continue, return, or throw <语句完成类型>
[[value]]: Types 
[[target]]: label

Lexical Envorinment
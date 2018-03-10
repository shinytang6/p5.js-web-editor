import createScopedEvaluationChain from './createScopedEvaluationChain';

let evalNext = createScopedEvaluationChain((next) => {
  evalNext = next;
});

export default function handleConsoleExpressions(expression) {
  // alert(expression)
  return evalNext(expression);
}

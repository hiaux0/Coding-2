// https://js.tensorflow.org/tutorials/core-concepts.html

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

// [Tensors] - central unit in TF.js
// | A set of numerical values shaped into an array of one or
// | more dimensions.

// [Shape] A `Tensor` instance has a ~ attribute that defines
// | the array shape, ie. how many values are in each dimension
// | of the array.

// The primary `Tensor` conustrctuor is the `tf.tsenor` functioen

/**
* @typedef {Array<rows, columns>} Shape
*/
/**
 * @typedef {Object} Tensor
 * @property {Array<Numbers>} data
 * @property {Shape} shape
 */

// 2x3 Tensor
const shape = [2, 3]; // 2 rows, 3 columns
const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); /*?*/

// The shape can also be inferred:
const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]], shape);
b.print() /*?*/

// However, for constructing low-rank tensors, we recommend
// using the folloindg funtionts to enhance code readability:
// tf.scalar, tf,tensor1d, tf.tensor2d, tf.tensor3d, tf.tensor4d

// The following example creates an identical tensor to the
// one above

const c = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]])

// TF.js also provides convenience functions for creating
// tensors with all values set to
// 0 - tf.zeroes
// or all values set to
// 1 - tf.ones

const zeros = tf.zeros([3,5]);

// [immutable] In TF.js, tensors are immutable; once created,
// | you cannot change their values. Instead you perform
// | operations on them that generate new tensors.

// ------------------------- Variables

// [Variables] are initialized with a tensor of values.
// | Unlike `Tensors`, however, their values are [mutable].
// | You cana assign a new tensor to an existing variable using
// | the `assign` method

const initialValues = tf.zeros([5]);
const biases = tf.variable(initialValues);
biases.print();

const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues);
biases.print()

// ---------------------- Operations (Ops)

// While tensors allow you to store data

// [Operations (Ops)] allow you to manipulate that data.

// TF.js provides a wide variety of ops suitable for
// linear algebra and machine learning that can be performed
// on tensors. Because tensors are immutable, these ops do not
// change their values; instead, ops return new tensors.

// Available ops include unary ops such as `square`
const d = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
const d_squared = d.square();
d_squared.print();

const e = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
const f = tf.tensor2d([[5.0, 6.0], [7.0, 8.0]]);

const e_plus_f = e.add(f);
e_plus_f.print();

// TF.js has a chainable API; you can call ops on the result
// of ops:

const sq_sum = e.add(f).square();
sq_sum.print();

// All operations are also exposed as functions in the main
// namespace, so you could also do the following
const sq_sum1 = tf.square(tf.add(e,f));

// ------------------ Models and Layers

// Conceptually, a model is a function that given some input
// will produce some desired output.
// In TF.js there are two ways to create models.
// You an use ops direlcty to respresent the work the model does.
// For example

function predict(input) {
  // y = a*x^2 + b*x + c
  // More on tf.tidy in the next section
  return tf.tidy(() => {
    const x = tf.scalar(input);

    const ax2 = a.mul(x.square());
    const bx = b.mul(x);
    const y = ax2.add(bx).add(c);

    return;
  });
}

// Defined constatns: y = 2x^2 + 4x + 8
const a = tf.scalar(2);
const b = tf.scalar(4);
const c = tf.scalar(8);

// Predict output for input of 2
const result = predict(2);
result.print();

// You can also use the high-lvl API `tf.model` to construct
// a model out of layers, which are a popular abstraction in
// deep learning. The following code constructs a
// `tf.sequential` model

const model = tf.sequential();
model.add(
  tf.layers.simpleRNN({
    units: 20,
    recurrentInitializer: 'GlorotNormal',
    inputShape: [80, 4]
  })
);

const optimizer = tf.train.sgd(LEARNING_RATE);
model.compile({optimizer, loss: 'categoricalCrossentropy'});
model.fit({x: data, y: labels});

// There are many different types of layers available in TF.js.
// A few examples include
// `tf.layers.simpleRNN`,
// `tf.layers.gru`,
// `tf.layers.lstm`

// ------------------------ Memory Management: dispose and tf.tidy

// Because TF.js uses the GPU to accelerate math operations, it's
// necessary to manage GPU memory when working with tensores
// and variables.

// TF.js provide two functions to help with this:
// `dispose` and `tf.tidy`.

// [dispose]
// | You can call ~ on a tensor or variable to purge it and free
// | up its GPU memory:

const x = tf.tensor2d([[0.0, 2.0], [4.0, 6.0]]);
const x_squared = x.square();

x.dispose();
x_squared.dispose();

// ## tf.tidy

// Using `dispose` can be cumbersome when doing a lot of sensor
// operations. TF.js provides another function, `tf.tidy`, that
// plays a similar role to regular scopes in JS, but for
// GPU-backed tensors.

// `tf.tidy` executes a function and purges any intermediate
// tensors created, freeing up their GPU memory.
// It does not purge the return value of the inner function.

const average = tf.tidy(() => {
  // Even in a short seq. of ops like the one below, a num. of
  // intermediate tensors get created. So it is a good practice to
  // put your math ops in a tidy!
  const y = tf.tensor1d([1.0, 2.0, 3.0, 4.0]);
  const z = tf.ones([4]);

  return y.sub(z).square().mean();
});

average.print();

// Using `tf.tidy` will help prevent memory leaks in your app.
// it can also be used to more carefully control when memory is
// reclaimed.

// ## Two important notes
// - The fnc passed to `tf.tidy` should be synchronous and also
// not return a promise. We suggest keeping code that updates the
// UI or makes remote requests outside of `tf.tidy`
// - `tf.tidy` will not clean up variables. Variables typically
// last through the entire lifecycle of a machine learning model
// so TF.js doesn't clean them up even if they are created in a
// `tidy`; however, you can call `dispose` on them manually.
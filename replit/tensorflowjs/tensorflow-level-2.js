// https://js.tensorflow.org/tutorials/fit-curve.html
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

// # Trainig first steps: Ftitting a curve to synthetic data

// in this tutoreial, we'll use TF.js to fit a curve to a
// synthetic dataset. given some data generated using a
// polynomial function with some noise added, we'll train a
// model to discover the coefficients used to generate the data.

// ## Prerequisites
// This tut. assumes familirty with the fundamental building blocks.
// of tf.js: tensors, variables, and ops.

// ## Running the code
// This tutorial focuses on the tf.js code used to build the model
// and learn its coefficients. The full code for this tutorial can be found...

// our task is to learn the coefficents of thi fnc. the values
// of a,b,c and d thta fest fit hte date. Let's tale a look at how
// we might learn those values using tf.js ops.

// ## Step 1: Set up vars.
// Frist let's create some vars to hold our current best estimate
// of these values at each step of model training.
// To start, we'll assign each of these vars a randome num.

const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

// ## Step 2: Build a model
// We can represent our polynomial function
// y = ax^3 + bx^2 + cx + d
// in tfjs by chaining a series of math ops.

// The following code constructs a `predict` fnc that takes `x`
// as input and returns `y`.

function predict(x) {
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(3)))
      .add(b.mul(x.pow(2)))
      .add(c.mul(x))
      .add(d);
  });
}

// let's go ahead and plot our polynomial fnc. using random values
// for a,b,c, and d that we set in Step 1.
// Our plot will look sth. like this

// exepect a poorly fitted graph here

// Because we started with rnd vals., our fnc is likely a very poor
// fit for the data set. The model has yet to learn better vals
// for the coefficients.

// # Step 3: Train the model
// Our final step is to train the model to learn good vals for
// the coefficients. To train our model, we need to define three things.

// - A [loss function]
// | which measures how well a given polynomial fits the data.
// | The lower the loss value, the better the polynomial fits
// | the data.

// - An [optimizer]
// | which implements an algo for revising our coefficient vals
// | based on the output of the loss fnc. The optimizer's goal
// | is to minimize the output val of the loss fnc.

// ### Define the loss fnc.
// for this tut, we'll use mean squared error (MSE) as our loss fnc.
// MSE is calculated by squaring the actual y val and the predict y
// val for each x val. in our data set, and then taking the mean
// of all the resulting terms.

// We can define a MSE loss function in tf.js as follows:
function loss (predictions, labels) {
  // sub our labels (actual vals) from predictions, square
  // the results and take the mean.
  const mse = predictions.sub(labels).square().mean();
  return mse;
}
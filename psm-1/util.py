import math


def sign(n):
    return math.copysign(1, n)


def find_x_with_sign(expr, target_sign):
    step_increase = 100
    iterations, max_iterations = 0, 10 * pow(10, 3)
    step = 1
    x = 0
    while True:
        y = eval(expr, {"x": x})
        if sign(y) == target_sign:
            return x, y
        y = eval(expr, {"x": -x})
        if sign(y) == target_sign:
            return -x, y

        x += step
        iterations += 1
        if iterations % step_increase == 0:
            step += 1

        if iterations >= max_iterations:
            raise RuntimeError('Failed to find values of x with opposite signs')

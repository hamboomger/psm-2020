from util import find_x_with_sign


def convert_to_func(expr):
    def expr_func(x):
        return eval(expr, {'x': x})
    return expr_func


def find_xn(f, x0, x1):
    return x0 - f(x0) * (x1 - x0) / (f(x1) - f(x0))


def find_root(expr, precision):
    x_with_negative_y, negative_y = find_x_with_sign(expr, -1)
    x_with_positive_y, positive_y = find_x_with_sign(expr, 1)
    iterations = 0

    x0, y0, x1, y1 = ((x_with_negative_y, x_with_positive_y)
                      if x_with_positive_y < x_with_positive_y
                      else (x_with_positive_y, positive_y, x_with_negative_y, negative_y))

    x0n = x0
    x1n = x1
    f = convert_to_func(expr)
    while True:
        iterations += 1
        midpoint_x = find_xn(f, x0n, x1n)
        # m_n = x0n - f(x0n)*(x1n - x0n)/(f(x1n) - f(x0n))
        midpoint_y = f(midpoint_x)
        if round(midpoint_y, precision) == 0:
            return midpoint_x, iterations

        if f(x0n)*midpoint_y < 0:
            x0n = x0n
            x1n = midpoint_x
        else:
            x0n = midpoint_x
            x1n = x1n

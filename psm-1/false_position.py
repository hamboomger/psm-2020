from util import find_x_with_sign


def find_x_for_y_zero(x0, y0, x1, y1):
    return x0 - y0*(x1-x0)/(y1-y0)


def find_root(expr, precision):
    x_with_negative_y, negative_y = find_x_with_sign(expr, -1)
    x_with_positive_y, positive_y = find_x_with_sign(expr, 1)
    iterations = 0

    x0, y0, x1, y1 = ((x_with_negative_y, negative_y, x_with_positive_y, positive_y)
                      if x_with_positive_y > x_with_negative_y
                      else (x_with_positive_y, positive_y, x_with_negative_y, negative_y))

    while True:
        iterations += 1
        x_intercept = find_x_for_y_zero(x0, y0, x1, y1)
        midpoint_y = eval(expr, {"x": x_intercept})
        if round(midpoint_y, precision) == 0:
            return x_intercept, iterations

        if midpoint_y * y0 < 0:
            x1, y1 = x_intercept, midpoint_y
        else:
            x0, y0 = x_intercept, midpoint_y


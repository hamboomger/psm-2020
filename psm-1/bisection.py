from util import find_x_with_sign


def find_root(expr, precision):
    (x_with_negative_y, negative_y) = find_x_with_sign(expr, -1)
    (x_with_positive_y, positive_y) = find_x_with_sign(expr, 1)
    iterations = 0
    while True:
        midpoint_x = (x_with_negative_y + x_with_positive_y) / 2
        midpoint_y = eval(expr, {"x": midpoint_x})
        if round(midpoint_y, precision) == 0:
            return midpoint_x, iterations
        elif midpoint_y > 0:
            x_with_positive_y = midpoint_x
        else:
            x_with_negative_y = midpoint_x
        iterations += 1




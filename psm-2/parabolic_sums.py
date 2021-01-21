import math


# useful link: https://www.intmath.com/integration/6-simpsons-rule.php
def calculate(func, x0, x1, subdivision_length_approx):
    def f(x):
        return eval(func, {'x': x})

    area_length = x1-x0
    n_of_subdivisions = math.floor(area_length / subdivision_length_approx)
    if n_of_subdivisions % 2 == 1:
        n_of_subdivisions += 1

    dx = area_length / n_of_subdivisions
    even_numbers = range(2, n_of_subdivisions, 2)   # except last
    odd_numbers = range(1, n_of_subdivisions, 2)    # except first
    y_even_sum = sum([f(x0 + dx*x) for x in even_numbers])
    y_odd_sum = sum([f(x0 + dx*x) for x in odd_numbers])
    area = dx/3 * (f(x0) + 4 * y_odd_sum + 2 * y_even_sum + f(x1))
    return area


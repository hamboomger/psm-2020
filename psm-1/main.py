import bisection
import false_position
import secant_method

DECIMAL_PRECISION = 3

EXPRESSIONS = {
    'pow(x - 1, 3) - x': '(x-1)^3 - x',
    'pow(x - 2, 2) - 3': '(x-2)^3 - 3',
    'pow(x, 3) - x - 2': 'x^3 - x - 2'
}


def main():
    option = get_user_option()
    if option == '1':
        for expr, expr_name in EXPRESSIONS.items():
            find_root_and_print_result(expr, expr_name)
    else:
        expr = get_valid_expression_from_input()
        find_root_and_print_result(expr, expr)


def find_root_and_print_result(expr, expr_name):
    print('Precision: %s' % DECIMAL_PRECISION)
    print('Expression: %s' % expr_name)
    root1, iterations_number1 = bisection.find_root(expr, DECIMAL_PRECISION)
    print('1. Bisection: %s(%s iterations)' % (str(root1), iterations_number1))
    root2, iterations_number2 = false_position.find_root(expr, DECIMAL_PRECISION)
    print('2. False position: %s(%s iterations)' % (str(root2), iterations_number2))
    root3, iterations_number3 = secant_method.find_root(expr, DECIMAL_PRECISION)
    print('3. Secant method: %s(%s iterations)' % (str(root3), iterations_number3))


def get_user_option():
    option = input('Press 1 to use default functions, press 2 in order to define your own function (and ENTER '
                   'afterwards):\n')
    while True:
        if option in ['1', '2']:
            return option
        else:
            option = input('Invalid option, please try one more time:')


def get_valid_expression_from_input():
    expr = input('Please input continuous function f(x):')
    while True:
        try:
            eval(expr, {"x": 0})
            return expr
        except:
            expr = input('Invalid expression, please try one more time:')


def find_roots_using_bisection(expr):

    pass


if __name__ == '__main__':
    main()

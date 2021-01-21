import midpoint_sums
import trapezoidal_sums
import parabolic_sums

SUBDIVISION_LENGTH = 0.5
X_POINTS = [0, 5]

EXPRESSIONS = {
    'pow(x - 1, 3) - x': {
        'name': '(x-1)^3 - x',
        'result': 55.614
    },
    'pow(x + 1, -2)': {
        'name': '(x+1)^(-2)',
        'result': 0.833
    },
    'pow(x, 2) - 10 * x': {
        'name': 'x^2 - 10x',
        'result': -83.333,
    }
}

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    [x0, x1] = X_POINTS
    for (expr, metadata) in EXPRESSIONS.items():
        print('====== Function: %s | Estimated result: %s | Precision: %s' %
              (metadata['name'], metadata['result'], SUBDIVISION_LENGTH))
        value1 = midpoint_sums.calculate(expr, x0, x1, SUBDIVISION_LENGTH)
        value2 = trapezoidal_sums.calculate(expr, x0, x1, SUBDIVISION_LENGTH)
        value3 = parabolic_sums.calculate(expr, x0, x1, SUBDIVISION_LENGTH)
        print('midpoint_sums: %s' % value1)
        print('trapezoidal_sums: %s' % value2)
        print('parabolic_sums: %s' % value3)

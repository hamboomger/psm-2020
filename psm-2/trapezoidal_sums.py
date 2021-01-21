def calculate(func, x0, x1, subdivision_length):
    total_area = 0
    x = x0
    while True:
        dx = subdivision_length
        if x >= x1:
            return total_area
        elif x + subdivision_length > x1:
            dx = x1 - x

        y0 = eval(func, {'x': x})
        y1 = eval(func, {'x': x + dx})
        subd_area = (y0+y1)/2 * dx
        total_area += subd_area
        x += subdivision_length

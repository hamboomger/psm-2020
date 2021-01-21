def calculate(func, x0, x1, subdivision_length):
    total_area = 0
    x = x0 + subdivision_length/2
    while True:
        if x > x1:
            return total_area

        subd_area = subdivision_length * eval(func, {'x': x})
        total_area += subd_area
        x += subdivision_length

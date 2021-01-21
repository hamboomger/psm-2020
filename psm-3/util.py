from random import uniform


class Plane:
    def __init__(self, x_min, x_max, y_min, y_max):
        self.y_max = y_max
        self.y_min = y_min
        self.x_max = x_max
        self.x_min = x_min

    def area(self):
        return (self.x_max - self.x_min) * (self.y_max - self.y_min)


class Coord:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Rectangle:
    def __init__(self, c1: Coord, c2: Coord):
        self.c2 = c2
        self.c1 = c1


class Edge:
    def __init__(self, a: Coord, b: Coord):
        self.a = a
        self.b = b


class Polygon:
    def __init__(self, edges):
        self.edges = edges


def generate_n_coords(n: int, plane: Plane):
    x_coords = [round(uniform(plane.x_min, plane.x_max), 2) for _ in range(n)]
    y_coords = [round(uniform(plane.y_min, plane.y_max), 2) for _ in range(n)]
    return [Coord(x_coords[i], y_coords[i]) for i in range(n)]

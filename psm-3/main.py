from math import sin, cos

import functions
import polygons
import rectangles
from util import Rectangle, Coord, Plane, Polygon, Edge

NUMBERS_TO_GENERATE = 5 * pow(10, 4)    # 50 000 generated coords


def print_values(name, result_tuple):
    (area, points_n_inside, percentage) = result_tuple
    print('========= %s:' % name)
    print('points inside of a shape: %s (%s%%)' % (points_n_inside, percentage))
    print('area: %s' % area)


def run_for_rectangles(plane: Plane):
    rect = Rectangle(Coord(-1, 3), Coord(4, -1))
    print_values('rectangle', rectangles.find_area(plane, rect, NUMBERS_TO_GENERATE))
    

def run_for_polygons(plane: Plane):
    square = Polygon([
        Edge(a=Coord(x=-1, y=3), b=Coord(x=4, y=3)),
        Edge(a=Coord(x=4, y=3), b=Coord(x=4, y=-1)),
        Edge(a=Coord(x=4, y=-1), b=Coord(x=-1, y=-1)),
        Edge(a=Coord(x=-1, y=-1), b=Coord(x=-1, y=3))
    ])
    square_hole = Polygon([
        Edge(a=Coord(x=0, y=0), b=Coord(x=10, y=0)),
        Edge(a=Coord(x=10, y=0), b=Coord(x=10, y=10)),
        Edge(a=Coord(x=10, y=10), b=Coord(x=0, y=10)),
        Edge(a=Coord(x=0, y=10), b=Coord(x=0, y=0)),
        Edge(a=Coord(x=2.5, y=2.5), b=Coord(x=7.5, y=2.5)),
        Edge(a=Coord(x=7.5, y=2.5), b=Coord(x=7.5, y=7.5)),
        Edge(a=Coord(x=7.5, y=7.5), b=Coord(x=2.5, y=7.5)),
        Edge(a=Coord(x=2.5, y=7.5), b=Coord(x=2.5, y=2.5))
    ])
    random_shape = Polygon([
        Edge(a=Coord(x=0, y=0), b=Coord(x=2.5, y=2.5)),
        Edge(a=Coord(x=2.5, y=2.5), b=Coord(x=0, y=10)),
        Edge(a=Coord(x=0, y=10), b=Coord(x=2.5, y=7.5)),
        Edge(a=Coord(x=2.5, y=7.5), b=Coord(x=7.5, y=7.5)),
        Edge(a=Coord(x=7.5, y=7.5), b=Coord(x=10, y=10)),
        Edge(a=Coord(x=10, y=10), b=Coord(x=10, y=0)),
        Edge(a=Coord(x=10, y=0), b=Coord(x=2.5, y=2.5))
    ])
    print_values('square', polygons.find_area(plane, square, NUMBERS_TO_GENERATE))
    print_values('square_hole', polygons.find_area(plane, square_hole, NUMBERS_TO_GENERATE))
    print_values('random_shape', polygons.find_area(plane, random_shape, NUMBERS_TO_GENERATE))


def run_for_functions(plane: Plane):
    print_values('sin (-2, 2)', functions.find_area(plane, sin, -2, 2, NUMBERS_TO_GENERATE))
    print_values('cos (-2, 2)', functions.find_area(plane, cos, -2, 2, NUMBERS_TO_GENERATE))


if __name__ == '__main__':
    plane = Plane(-10, 10, -10, 10)
    print('RECTANGLES\n')
    run_for_rectangles(plane)
    print('\nPOLYGONS\n')
    run_for_polygons(plane)
    print('\nFUNCTIONS\n')
    run_for_functions(plane)

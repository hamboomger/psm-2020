from typing import Callable
from util import Plane, generate_n_coords, Coord


def _is_inside_of_fun(point: Coord, f: Callable[[float], float], x0, x1):
    if x0 <= point.x <= x1:
        y = f(point.x)
        if y * point.y < 0:
            return False
        elif y > 0:
            return y > point.y
        else:
            return y < point.y
    else:
        return False


def find_area(plane: Plane, f: Callable[[float], float], x0, x1, n_to_generate: int):
    random_coords = generate_n_coords(n_to_generate, plane)
    points_inside = filter(lambda point: _is_inside_of_fun(point, f, x0, x1), random_coords)
    n_of_points_inside = len(list(points_inside))
    percentage = n_of_points_inside / n_to_generate * 100
    rect_area = (plane.area() * n_of_points_inside) / n_to_generate
    return rect_area, n_of_points_inside, percentage

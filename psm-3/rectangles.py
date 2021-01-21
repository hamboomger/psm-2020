from util import Plane, Coord, Rectangle, generate_n_coords


def is_inside_rectangle(point: Coord, rect: Rectangle):
    return rect.c1.x <= point.x <= rect.c2.x \
            and rect.c2.y <= point.y <= rect.c1.y


def find_area(plane: Plane, rect: Rectangle, n_to_generate=10000):
    random_coords = generate_n_coords(n_to_generate, plane)
    points_inside = filter(lambda point: is_inside_rectangle(point, rect), random_coords)
    n_of_points_inside = len(list(points_inside))
    percentage = n_of_points_inside / n_to_generate * 100
    rect_area = (plane.area() * n_of_points_inside) / n_to_generate
    return rect_area, n_of_points_inside, percentage

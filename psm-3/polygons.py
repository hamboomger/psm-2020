from util import Polygon, Plane, generate_n_coords
import ray_casting


def find_area(plane: Plane, polygon: Polygon, n_to_generate=10000):
    random_coords = generate_n_coords(n_to_generate, plane)
    points_inside = filter(lambda point: ray_casting.is_inside(point, polygon), random_coords)
    n_of_points_inside = len(list(points_inside))
    percentage = n_of_points_inside / n_to_generate * 100
    rect_area = (plane.area() * n_of_points_inside) / n_to_generate
    return rect_area, n_of_points_inside, percentage


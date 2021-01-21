import sys
from util import Polygon, Edge, Coord

_eps = 0.00001
_huge = sys.float_info.max
_tiny = sys.float_info.min


def ray_intersects(p: Coord, edge: Edge):
    a, b = edge.a, edge.b
    if a.y > b.y:
        a, b = b, a
    if p.y == a.y or p.y == b.y:
        p = Coord(p.x, p.y + _eps)

    intersect = False

    if (p.y > b.y or p.y < a.y) or (
            p.x > max(a.x, b.x)):
        return intersect

    if p.x < min(a.x, b.x):
        intersect = True
    else:
        if abs(a.x - b.x) > _tiny:
            m_red = (b.y - a.y) / float(b.x - a.x)
        else:
            m_red = _huge
        if abs(a.x - p.x) > _tiny:
            m_blue = (p.y - a.y) / float(p.x - a.x)
        else:
            m_blue = _huge
        intersect = m_blue >= m_red
    return intersect


def is_inside(p: Coord, poly: Polygon):
    intersections = filter(lambda edge: ray_intersects(p, edge), poly.edges)
    return len(list(intersections)) % 2 == 1

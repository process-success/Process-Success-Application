import frappe
import pprint
from collections import OrderedDict


def get_context(context):
    work_orders = frappe.get_all("work_order", fields =["name", "location", "status", "route"])
    context.work_orders = OrderedDict(sorted(group_work_orders_by_status(work_orders).iteritems(), key=lambda t: t[0]))


def group_work_orders_by_status(work_order_list):
    work_orders = {}
    for work_order in work_order_list:
        if work_order.status in work_orders.keys():
            work_orders[work_order.status].append(work_order)
        else:
            work_orders[work_order.status] = [work_order]
    return work_orders
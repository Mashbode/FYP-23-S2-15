from django.http import JsonResponse


class filenotUrsResponse(JsonResponse):
    def __init__(self, *args, **kwargs):
        data ={
            'status': 'fail',
            'reason': 'File does not belong to you',
        }
        super().__init__(data,*args, **kwargs)
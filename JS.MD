const store = new CustomStore({ key: 'OrderNumber', load(loadOptions) { let
params = {}; return ApiService.get('commutes/list.do', params).then((response)
=> { const data = response.data; return { data: data.list, totalCount:
data.totalCount }; }); } });

cellRender={dateTimeCellRender} customizeText={dateTimeCellRender}

arg[0].data

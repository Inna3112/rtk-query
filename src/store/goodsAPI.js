import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const goodsAPI = createApi({
    reducerPath: 'goodsAPI',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    endpoints: (build => ({
        //add prefix use and suffix query
        getGoods: build.query({
            query: (limit= '') => `goods?${limit && `_limit=${limit}`}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), {type: 'Products', id: 'LIST'}]
                    : [{type: 'Products', id: 'LIST'}],
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        })
    }))
});

export const {useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation} = goodsAPI;

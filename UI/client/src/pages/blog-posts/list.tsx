import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const BlogPostList = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "Title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "Desc",
        flex: 1,
        headerName: "Description",
        minWidth: 200,
      },
      {
        field: "DueDate",
        flex: 1,
        headerName: "DueDate",
        minWidth: 200,
      },
      {
        field: "Status",
        flex: 1,
        headerName: "Status",
        minWidth: 200,
      },
      {
        field: "Image",
        flex: 1,
        headerName: "Image",
        minWidth: 200,
      },
    
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

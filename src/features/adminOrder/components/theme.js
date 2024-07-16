export const table_theme = {
	Table: `
  margin:1rem;
  padding: 4px;
  border-radius: .5rem;
  background-color: #1c2533;
  
  `,

	Header: `
    font-size: 16px
    font-weight: bold
    
    `,
	Body: "",
	BaseRow: `
    font-size: 14px;
     

  `,
	HeaderRow: `
    color: #b856ff;
    & > .th {
    border-bottom: 2px solid #1d102a;
    padding: 8px 4px;
    }
    
  `,
	Row: `
    color: #eee;
   
    &.disabled {
      color: #aaa;
    }

    &:not(:last-of-type)  > .td {
      border-bottom: 2px solid #1d102a;
     
    }
  
  `,
	BaseCell: `
    padding: 4px 8px;

    background-color: #1c2533;
    display:grid;
    place-items:center;
   
  `,
	HeaderCell: `
    font-weight: bold;
  

    .resizer-handle {
      background-color: #131313;
    }

    svg,
    path {
      fill: currentColor;
    }
  `,
	Cell: `
  
    &:focus {
      outline: dotted;
      outline-width: 1px;
      outline-offset: -1px;
    }
      &:first-child {
      font-weight: bold;
      
      }
     
  `,
};

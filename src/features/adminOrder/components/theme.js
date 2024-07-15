export const table_theme = {
	Table: "",

	Header: `
    font-size: 17px
    font-weight: bold
    
    `,
	Body: "",
	BaseRow: `
    font-size: 16px;
  `,
	HeaderRow: `
    color: #9549ff;
  `,
	Row: `
    color: #131313;

    &.disabled {
      color: #303030;
    }

    &:hover {
      color: "#000000";
    }

    &:not(:last-of-type) > .td {
      border-bottom: 1px solid #000;
    }
  
  `,
	BaseCell: `
    padding: 6px 12px;
  `,
	HeaderCell: `
    font-weight: bold;
    border-bottom: 1px solid #131313;

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
      &:first-child::before {
       content : "#"
      }
  `,
};

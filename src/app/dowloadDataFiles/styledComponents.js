import styled from 'styled-components'

export const TableStyles = styled.div`

  overflow: auto;


  .table {
    display: inline-block;
    border-spacing: 0;

    

    .tr {
        :hover{
            color: white;
            background-color: #cadce7;
        }
      :last-child {
        .td {
          border-bottom: 0;
          
        }
      }
    }

    .th{
      font-size: 14px;
      text-align: center;
      background-color: #32617d;
      color: #FFFFFF;
      font-weight: bold;
      border-bottom: 2px solid #3d779b;
      padding: 2px;
        .resizer {
            display: inline-block;
            background: #3d779b;
            width: 5px;
            height: 100%;
            position: absolute;
            right: 0px;
            top: 0;
            transform: translateX(50%);
            ${'' /* prevents from scrolling while dragging on touch devices */}
            touch-action:none;
            &.isResizing {
              background: #c93a1d;
            }
          }
    }
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #3d779b;
      border-right: 1px solid #3d779b;
      color: #666666;
      overflow: hidden;
      :last-child {
        border-right: 1px solid #3d779b;
      }
    }
  }
`
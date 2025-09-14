import { Component } from '@angular/core';
import { CheckboxesList } from '../checkboxes-list/checkboxes-list';

@Component({
  selector: 'lib-nested-checkboxes',
  imports: [CheckboxesList],
  templateUrl: './nested-checkboxes.html',
  styleUrl: './nested-checkboxes.scss',
})
export class NestedCheckboxes {
  public checkboxesData = [
    {
      id: 1,
      name: 'Electronics',
      checked: false,
      children: [
        {
          id: 2,
          name: 'Mobile phones',
          checked: false,
          children: [
            {
              id: 3,
              name: 'iPhone',
              checked: false,
            },
            {
              id: 4,
              name: 'Android',
              checked: false,
            },
          ],
        },
        {
          id: 5,
          name: 'Laptops',
          checked: false,
          children: [
            {
              id: 6,
              name: 'MacBook',
              checked: false,
            },
            {
              id: 7,
              name: 'Surface Pro',
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: 'Books',
      checked: false,
      children: [
        {
          id: 9,
          name: 'Fiction',
          checked: false,
        },
        {
          id: 10,
          name: 'Non-fiction',
          checked: false,
        },
      ],
    },
    {
      id: 11,
      name: 'Toys',
      checked: false,
    },
  ]
  // public checkboxesData = signal([
  //   {
  //     id: 1,
  //     name: 'Electronics',
  //     checked: false,
  //     children: [
  //       {
  //         id: 2,
  //         name: 'Mobile phones',
  //         checked: false,
  //         children: [
  //           {
  //             id: 3,
  //             name: 'iPhone',
  //             checked: false,
  //           },
  //           {
  //             id: 4,
  //             name: 'Android',
  //             checked: false,
  //           },
  //         ],
  //       },
  //       {
  //         id: 5,
  //         name: 'Laptops',
  //         checked: false,
  //         children: [
  //           {
  //             id: 6,
  //             name: 'MacBook',
  //             checked: false,
  //           },
  //           {
  //             id: 7,
  //             name: 'Surface Pro',
  //             checked: false,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     name: 'Books',
  //     checked: false,
  //     children: [
  //       {
  //         id: 9,
  //         name: 'Fiction',
  //         checked: false,
  //       },
  //       {
  //         id: 10,
  //         name: 'Non-fiction',
  //         checked: false,
  //       },
  //     ],
  //   },
  //   {
  //     id: 11,
  //     name: 'Toys',
  //     checked: false,
  //   },
  // ])
}

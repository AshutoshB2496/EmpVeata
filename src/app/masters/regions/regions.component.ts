import {AfterViewInit, Component, OnInit} from '@angular/core';


declare const $: any;

@Component({
    selector: 'app-regions',
    templateUrl: './regions.component.html',
    styleUrls: ['regions.component.css']
})

export class RegionsComponent implements OnInit, AfterViewInit {

    zones = ['East', 'West', ' North', 'South'];
    eastData = [
        {
            'name': 'Assam',
            'areas': [
                {'name': 'Area1'},
                {'name': 'Area2'}
            ]},
        {
            'name': 'Manipur',
            'areas': [
                {'name': 'Area1'},
                {'name': 'Area2'}
            ]},
        {
            'name': 'West Bengal',
            'areas': [
                {'name': 'Area1'},
                {'name': 'Area2'}
            ]},
        {
            'name': 'Arunachal Pradesh',
            'areas': [
                {'name': 'Area1'},
                {'name': 'Area2'}
            ]}
        ];
    westData = [];
    northData = [];
    southData = [];
    ngOnInit() {

    }

    ngAfterViewInit() {
        $(function () {
            $('.tree li:has(ul.sub_ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');
                } else {
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square').removeClass('fa-plus-square');
                }
                e.stopPropagation();
            });
        });

    }
}

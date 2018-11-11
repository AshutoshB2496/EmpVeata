import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableData} from '../../md/md-table/md-table.component';
import {CatalogueService} from './catalogue.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import swal from 'sweetalert2';


declare const $: any;

declare interface Product {
    title: string;
}

const bucket = new S3(
    {
        accessKeyId: ' AKIAJYG5X4AVZLNC3GMA',
        secretAccessKey: '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',
        region: 'us-east-2'
    }
);

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.component.html',
    styleUrls: ['catalogue.component.css']
})

export class CatalogueComponent implements OnInit, AfterViewInit {

    public tableData: TableData;
    public cat_01: any[];
    public cat_02: any[];
    public cat_03: any[];
    image = '';
    selectedFile: File;
    startLoading = false;
    status: number;
    Basic: FormGroup;
    Packing: FormGroup;
    Collaterals: FormGroup;
    CollateralsShow = [];
    sizes = [];
    Packings = [];
    group;

    constructor(private service: CatalogueService, private fb: FormBuilder) {

    }

    showCollaterals(data) {
        this.CollateralsShow = data;
    }

    currentSize: string[];
    regularItems = ['Tag 1', 'Tag 2', 'Tag 3'];

    removeImage() {
        this.image = '';
    }

    add() {
        this.Packings.length = 0;
        this.Packing.reset();
        this.Collaterals.reset();
        this.Basic.reset();
    }

    addAlone(group, category) {
        this.Packings.length = 0;
        this.Packing.reset();
        this.Collaterals.reset();
        this.Packing.controls['group'].setValue(group);
        this.Collaterals.controls['group'].setValue(group);
        this.group = group;
        this.service.getUnits(category).subscribe(value2 => {
            this.sizes = value2;
        });
    }

    onSelectFile(event) {
        this.startLoading = true;
        this.selectedFile = <File>event.target.files[0];
        this.uploadFile(this.selectedFile);
    }

    uploadFile(file) {
        const params = {
            Bucket: 'loanapp-android',
            Key: 'test-files/' + file.name,
            Body: file
        };
        const that = this;
        bucket.upload(params).on('httpUploadProgress', function (evt) {
            console.log('Uploaded :: ' + parseInt((evt.loaded * 100) / evt.total + '%', 10));
            that.status = parseInt((evt.loaded * 100) / evt.total + '%', 10);
            if (that.status === 100) {
                that.startLoading = false;
            } else {
                that.startLoading = false;
            }
        }).send(function (err, data) {
            that.image = data.Location;
            console.log(data, that.image);
        });
    }

    submitBasic() {
        this.Basic.controls['image'].setValue(this.image);
        this.service.AddBasic(this.Basic.value).subscribe(value => {
            this.Packing.controls['group'].setValue(this.Basic.get('group').value);
            this.Collaterals.controls['group'].setValue(this.Basic.get('group').value);
            this.image = '';
            this.service.getUnits(this.Basic.get('category').value).subscribe(value2 => {
                this.sizes = value2;
            });
        }, error1 => {
            swal({
                type: 'error',
                text: error1.error.msg,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-rose'
            }).catch(swal.noop);
        })
    }

    addPacking() {
        this.Packing.controls['factor'].setValue(1);
        console.log(this.Packing.value);
        this.Packings.push(this.Packing.value);
        console.log(this.Packings);
        this.Packing.reset();
        this.Packing.controls['group'].setValue(this.Basic.get('group').value);
    }

    addPackingAlone() {
        this.Packing.controls['factor'].setValue(1);
        this.Packings.push(this.Packing.value);
        this.Packing.reset();
        this.Packing.controls['group'].setValue(this.group);
    }

    submitPacking() {
        if (this.Packings.length > 0) {
            this.service.AddPacking(this.Packings).subscribe(value => {
                this.Packings.length = 0;
                this.refresh();
                this.Packing.reset();
            });
        }
    }

    submitCollaterals() {
        console.log(this.Collaterals.value);
        if (!this.Collaterals.invalid) {
            this.Collaterals.controls['image'].setValue(this.image);
            this.service.AddCollatoral(this.Collaterals.value).subscribe(value => {
                this.image = '';
                this.refresh();
                this.Collaterals.reset();
            })
        }
    }

    refreshDust() {
        this.service.getCategory('dust').subscribe(value => {
            this.cat_01 = value;
        });
    }

    refreshLiquid() {
        this.service.getCategory('liquid').subscribe(value => {
            this.cat_02 = value;
        });
    }

    refreshUnit() {
        this.service.getCategory('unit').subscribe(value => {
            this.cat_03 = value;
        });
    }

    refresh() {
        this.refreshDust();
        this.refreshLiquid();
        this.refreshUnit();
    }

    ngOnInit() {
        this.Basic = this.fb.group({
            molecule: ['', [Validators.required, Validators.maxLength(40)]],
            category: ['', [Validators.required]],
            group: ['', [Validators.required, Validators.maxLength(10)]],
            image: ['']
        });
        this.Collaterals = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            group: ['', [Validators.required]],
            image: ['']
        });
        this.Packing = this.fb.group({
            group: ['', [Validators.required]],
            code: ['', [Validators.required]],
            description: ['', [Validators.required]],
            unit: ['', [Validators.required]],
            factor: [1],
            rate: [null, [Validators.required]]
        });
        this.refresh();
        $('#showFilter').click(function () {
            $('#filterContainer').slideToggle();
        });

        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onInit: function (tab: any, navigation: any, index: any) {

                // check number of tabs and fill the entire row
                let $total = navigation.find('li').length;
                let $wizard = navigation.closest('.card-wizard');

                let $first_li = navigation.find('li:first-child a').html();
                let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);

                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
                $('.moving-tab').css('transition', 'transform 0s');
            },


            onTabShow: function (tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function () {
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if (index !== 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        $('.set-full-height').css('height', 'auto');
    }

    ngAfterViewInit() {

        $('.card .material-datatables label').addClass('form-group');
        // Initialize moving navigation
        $(window).resize(() => {
            $('.card-wizard').each(function () {

                const $wizard = $(this);
                const index = $wizard.bootstrapWizard('currentIndex');
                let $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
                });

                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });
    }
}

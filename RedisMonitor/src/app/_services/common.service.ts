import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommonService{
    REST_API: string = window.location.origin;
}
"use strict";

import * as vscode from "vscode";
import { commands, ExtensionContext, languages, Range, TextDocument, Uri, window, workspace } from "vscode";
import { HttpCodeLensProvider } from "./httpCodeLensProvider";
import { HttpieCompletion } from "./httpieCompletion";
import { RequestController } from "./requestController";

let requestController = new RequestController();

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand("httpie-client.request",
            ((document: TextDocument, range: Range) => requestController.run(range))));
    context.subscriptions.push(languages.registerCodeLensProvider("httpie", new HttpCodeLensProvider()));

    let selector: vscode.DocumentSelector = [{
        pattern: "**/*.httpie"
    }];
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(selector, new HttpieCompletion(), ""));
}

export function deactivate() { }
window.onload = function() {
    "use strict";
    var iWidth = 1000;
    var barMargin = 5;
    var scaleVal = 1;
    var imageObj = new Image();
    var systems = [];
    var minBar = 1;
    var textSize = 15;
    var textPadding = 3;
    //var stavesPerSystem = 3;
    
    function updateMulti(group, activeAnchor) {
        var topLeft = group.get(".tl")[0];
        var topRight = group.get(".tr")[0];
        var lowerRight = group.get(".lr")[0];
        var lowerLeft = group.get(".ll")[0];
        var bar = group.get(".bar")[0];
        var iBox = group.get(".barbox")[0];
        var nStaves = group.attrs.bars.length;
        topLeft.attrs.visible = true;
        topRight.attrs.visible = true;
        lowerRight.attrs.visible = true;
        lowerLeft.attrs.visible = true;
        // update anchor positions
        switch (activeAnchor.getName()) {
            case "tl":
                if (nStaves > 1) {
                    if (activeAnchor.attrs.y > group.attrs.lines[0].getY()) {
                        activeAnchor.attrs.y = group.attrs.lines[0].getY();
                    }
                    group.attrs.bars[0].setY(activeAnchor.attrs.y);
                    group.attrs.bars[0].setHeight(group.attrs.lines[0].getY() - activeAnchor.attrs.y);
                } else if (activeAnchor.attrs.y > lowerLeft.attrs.y) {
                    activeAnchor.attrs.y = lowerLeft.attrs.y;
                }
                if (activeAnchor.attrs.x > topRight.attrs.x) {
                    activeAnchor.attrs.x = topRight.attrs.x;
                }
                topRight.attrs.y = activeAnchor.attrs.y;
                lowerLeft.attrs.x = activeAnchor.attrs.x;
                break;
            case "tr":
                if (nStaves > 1) {
                    if (activeAnchor.attrs.y > group.attrs.lines[0].getY()) {
                        activeAnchor.attrs.y = group.attrs.lines[0].getY();
                    }
                    group.attrs.bars[0].setY(activeAnchor.attrs.y);
                    group.attrs.bars[0].setHeight(group.attrs.lines[0].getY() - activeAnchor.attrs.y);
                } else if (activeAnchor.attrs.y > lowerLeft.attrs.y) {
                    activeAnchor.attrs.y = lowerLeft.attrs.y;
                }
                if (activeAnchor.attrs.x < topLeft.attrs.x) {
                    activeAnchor.attrs.x = topLeft.attrs.x;
                }
                topLeft.attrs.y = activeAnchor.attrs.y;
                lowerRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "lr":
                if (nStaves > 1) {
                    if (activeAnchor.attrs.y < group.attrs.lines[group.attrs.lines.length - 1].getY()) {
                        activeAnchor.attrs.y = group.attrs.lines[group.attrs.lines.length - 1].getY();
                    }
                    group.attrs.bars[group.attrs.bars.length - 1].setHeight(activeAnchor.attrs.y - group.attrs.lines[group.attrs.lines.length - 1].getY());
                } else if (activeAnchor.attrs.y < topLeft.attrs.y) {
                    activeAnchor.attrs.y = topLeft.attrs.y;
                }
                if (activeAnchor.attrs.x < topLeft.attrs.x) {
                    activeAnchor.attrs.x = topLeft.attrs.x;
                }
                lowerLeft.attrs.y = activeAnchor.attrs.y;
                topRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "ll":
                if (nStaves > 1) {
                    if (activeAnchor.attrs.y < group.attrs.lines[group.attrs.lines.length - 1].getY()) {
                        activeAnchor.attrs.y = group.attrs.lines[group.attrs.lines.length - 1].getY();
                    }
                    group.attrs.bars[group.attrs.bars.length - 1].setHeight(activeAnchor.attrs.y - group.attrs.lines[group.attrs.lines.length - 1].getY());
                } else if (activeAnchor.attrs.y < topLeft.attrs.y) {
                    activeAnchor.attrs.y = topLeft.attrs.y;
                }
                if (activeAnchor.attrs.x > topRight.attrs.x) {
                    activeAnchor.attrs.x = topRight.attrs.x;
                }
                lowerRight.attrs.y = activeAnchor.attrs.y;
                topLeft.attrs.x = activeAnchor.attrs.x;
                break;
        }
    
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = lowerLeft.attrs.y - topLeft.attrs.y;
    
        bar.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        iBox.setPosition(topLeft.attrs.x - 5, topLeft.attrs.y - 5);
        bar.setSize(width, height);
        iBox.setSize(width + 10, height + 10);
            
        if (nStaves > 1) {
            var i;
            for (i = 0; i < group.attrs.lines.length; i++) {
                group.attrs.lines[i].setX(topLeft.attrs.x);
                group.attrs.lines[i].setWidth(width);
            }
            for (i = 0; i < group.attrs.bars.length; i++) {
                group.attrs.bars[i].setX(topLeft.attrs.x);
                group.attrs.bars[i].setWidth(width);
            }
            
        }
    }
    
    function refitBoxMulti(bGroup) {
        // The various components of a bar
        var topLeft = bGroup.get(".tl")[0];
        var topRight = bGroup.get(".tr")[0];
        var lowerRight = bGroup.get(".lr")[0];
        var lowerLeft = bGroup.get(".ll")[0];
        var bar = bGroup.get(".bar")[0];
        var iBox = bGroup.get(".barbox")[0];
        var barNumber = bGroup.get(".barnumber")[0];
        var lines = bGroup.attrs.lines;
        var bars = bGroup.attrs.bars;
        
        var tlPos = topLeft.getAbsolutePosition();
        var lrPos = lowerRight.getAbsolutePosition();
        
        var width = lrPos.x - tlPos.x;
        var height = lrPos.y - tlPos.y;
        
        // Reassign element positions
        
        var i, absY;
        for (i = 0; i < lines.length; i++) {
            absY = lines[i].getAbsolutePosition().y - tlPos.y;
            lines[i].setPosition({
                x: 0,
                y: absY
            });
        }
        for (i = 0; i < bars.length; i++) {
            absY = bars[i].getAbsolutePosition().y - tlPos.y;
            bars[i].setPosition({
                x: 0,
                y: absY
            });
        }
        
        bGroup.setPosition({
            x: tlPos.x,
            y: tlPos.y
        });
        barNumber.setPosition({
            x: 0,
            y: 0
        });
        bar.setPosition({
            x: 0,
            y: 0
        });
        iBox.setPosition({
            x: -barMargin,
            y: -barMargin
        });
        topLeft.setPosition({
            x: 0,
            y: 0
        });
        topRight.setPosition({
            x: width,
            y: 0
        });
        lowerRight.setPosition({
            x: width,
            y: height
        });
        lowerLeft.setPosition({
            x: 0,
            y: height
        });
        
        // Reassign element dimensions
        bar.setWidth(width);
        bar.setHeight(height);
        iBox.setWidth(width + (barMargin * 2));
        iBox.setHeight(height + (barMargin * 2));
        
        barNumber.setFontSize(textSize);
        if (width < (barNumber.getTextWidth() + 6)) {
            barNumber.setFontSize(textSize * (width / (barNumber.getTextWidth() + 6)));
        }
        if (height < (barNumber.getTextHeight() + 6)) {
            barNumber.setFontSize(textSize * (height / (barNumber.getTextHeight() + 6)));
        }
    }
    
    function addAnchorMulti(group, iBox, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();
        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: "#666",
            fill: "#ddd",
            strokeWidth: 2,
            radius: 3,
            name: name,
            draggable: true,
            visible: false
        });
        
        // Update bar when moved
        anchor.on("dragmove", function() {
            updateMulti(group, this);
            layer.draw();
        });
        // Prevent event from bubbling up when anchor selected, move bar to top, hide bar number
        anchor.on("mousedown", function(e) {
            group.setDraggable(false);
            this.moveToTop();
            e.cancelBubble = true;
            var number = group.get(".barnumber")[0];
            number.attrs.visible = false;
        });
        // Update score information on dragend (bar/system fitting, bar numbers)
        anchor.on("dragend", function() {
            resizeSystem(group.getParent().get(".system")[0]);
            group.setDraggable(true);
            updateNumbers();
            refitBoxMulti(group);
            var number = group.get(".barnumber")[0];
            number.attrs.visible = true;
            layer.draw();
        });
        // Add hover styling
        anchor.on("mouseover", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "pointer";
            this.setStrokeWidth(4);
            layer.draw();
        });
        // Restore hover styling on mouseout
        anchor.on("mouseout", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "move";
            this.setStrokeWidth(2);
            layer.draw();
        });
        // Keep anchor visible during drag
        group.on("mouseover dragmove", function() {
            anchor.attrs.visible = true;
            anchor.getLayer().draw();
        });
        // Hide anchors when mouse leaves bar
        group.on("mouseout", function() {
            anchor.attrs.visible = false;
            anchor.getLayer().draw();
        });
        group.add(anchor);
    }
    
    function getMultiStaffLines(group) {
        var yLines = [];
        var i;
        for (i = 0; i < group.attrs.lines.length; i++) {
            yLines[i] = Math.round(group.attrs.lines[i].getY() + (group.attrs.lines[i].getHeight() / 2));
        }
        return yLines;
    }
    
    function addStaffLine(stage, group, y, w, gH, bar, lineNum, barNum, bottom, numLines) {
        var nStaves = (numLines / 2) + 1;
        var line = new Kinetic.Rect({
            x: 0,
            y: y - 1,
            width: w,
            height: 3,
            fill: 'red',
            name: "line"
        });
        line.on("mouseover", function(evt) {
            document.body.style.cursor = "pointer";
            evt.cancelBubble = true;
        });
        line.on("mouseout", function(evt) {
            document.body.style.cursor = "move";
            evt.cancelBubble = true;
        });
        line.on("mousedown", function(evt) {
            stage.on("mousemove", function(e) {
                var pos = stage.getMousePosition(e);
                var pY = pos.y;
                var gY = group.getY();
                if (bottom === true) {
                    // Bottom of staff line
                    if (barNum == 0 && pY < gY) {
                        //First line hits top of system
                        pY = gY;
                    } else if (barNum > 0 && pY < (group.attrs.lines[lineNum - 1].getY() + gY)) {
                        //Non-first line hits top of its own staff
                        pY = group.attrs.lines[lineNum - 1].getY() + group.getY();
                    } else if (lineNum < (numLines - 1) && pY > (group.attrs.lines[lineNum + 1].getY() + gY)) {
                        //Line hits top of next staff
                        pY = group.attrs.lines[lineNum + 1].getY() + gY;
                    }
                    bar.setHeight(pY - (bar.getY() + gY));
                } else {
                    // Top of staff line
                    if (barNum == (nStaves - 1) && pY > (gH + gY)) {
                        //Last line hits bottom of system
                        pY = gH + gY;
                    } else if (barNum < (nStaves - 1) && pY > (group.attrs.lines[lineNum + 1].getY() + gY)) {
                        //Non-last line hits bottom of its own staff
                        pY = group.attrs.lines[lineNum + 1].getY() + gY;
                    } else if (lineNum > 0 && pY < (group.attrs.lines[lineNum - 1].getY() + gY)) {
                        //Line hits bottom of previous staff
                        pY = group.attrs.lines[lineNum - 1].getY() + gY;
                    }
                    var prevBottom = bar.getY() + bar.getHeight();
                    bar.setHeight(prevBottom + gY - pY);
                    bar.setY(pY - gY);
                }
                
                line.setY(pY - gY);
                group.getLayer().draw();
            });
            stage.on("mouseup", function() {
                stage.off("mousemove");
                stage.off("mouseup");
            });
            evt.cancelBubble = true;
        });
        group.attrs.lines.push(line);
        group.add(line);
    }
    
    function addBarMulti(stage, system, x, y, w, h, lines, number, id, facs) {
        if (id === undefined) {
            id = genUUID();
        }
        if (facs === undefined) {
            facs = genUUID();
        }
        
        var bGroup = new Kinetic.Group({
            x: x,
            y: y,
            draggable: true,
            name: "bargroup",
            number: number,
            lines: [],
            bars: [],
            id: id,
            facs: facs
        });
        
        // Insert bar into correct position in system's bars list
        var i = 0;
        for (i = 0; i < system.children.length; i++) {
            if (system.children[i].getX() > x) {
                system.attrs.bars.splice(i, 0, bGroup);
                break;
            }
        }
        if (i === system.children.length) {
            system.attrs.bars.push(bGroup);
        }
        
        system.add(bGroup);
        
        // Detection box for bar, coloured near-transparent orange (for now)
        var invisiBox = new Kinetic.Rect({
            x: -barMargin,
            y: -barMargin,
            width: w + (barMargin * 2),
            height: h + (barMargin * 2),
            fill: 'orange',
            alpha: 0.05,
            name: "barbox"
        });
        bGroup.add(invisiBox);
        
        var bar = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: w,
            height: h,
            fill: '',
            stroke: 'red',
            strokeWidth: 2,
            name: "bar"
        });
        
        // Pointer styling
        bGroup.on("mouseover", function() {
            this.moveToTop();
            document.body.style.cursor = "move";
        });
        bGroup.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        // Delete bar if alt-clicked, then re-number and update systems
        bGroup.on("click", function(e) {
            if (e.altKey) {
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                updateNumbers();
                resizeSystem(system);
            }
        });
        // Recalculate system membership, and system size on dragend
        bGroup.on("dragend", function(e) {
            var nearSystem = findNearestSystem(this);
            // If the nearest system is not the bar's current system, reassign membership
            if (nearSystem !== system) {
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                addBarMulti(stage, nearSystem, bGroup.getX(), bGroup.getY(), bar.getWidth(), bar.getHeight(), getMultiStaffLines(bGroup), 0);
                resizeSystem(nearSystem);
            }
            updateNumbers();
            resizeSystem(system);
            system.getLayer().draw();
            system = nearSystem;
        });
        
        var nStaves = 1;
        if (lines.length > 1) {
            nStaves = (lines.length / 2) + 1;
        }
        if (nStaves > 1) {
            for (i = 0; i < nStaves; i++) {
                var lIndex = 2 * i;
                var lTop = 0;
                var lBottom = h;
                if (lIndex > 0) {
                    lTop = lines[lIndex - 1];
                }
                if (lIndex < lines.length) {
                    lBottom = lines[lIndex];
                }
                var subBar = new Kinetic.Rect({
                    y: lTop,
                    width: w,
                    height: lBottom - lTop,
                    fill: 'blue',
                    alpha: 0.15,
                    stroke: 'black',
                    strokeWidth: 1,
                    name: "subbar"
                });
                bGroup.attrs.bars.push(subBar);
                bGroup.add(subBar);
            }
        }
        
        // Split bar if shift-clicked, splitting at location of click
        bar.on("click", function(e) {
            if (e.shiftKey) {
                var pos = stage.getMousePosition(e);
                var absBarPos = bar.getAbsolutePosition();
                var leftWidth = pos.x - absBarPos.x;
                var rightWidth = absBarPos.x + bar.getWidth() - pos.x;
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                
                addBarMulti(stage, system, absBarPos.x, absBarPos.y, leftWidth, bar.getHeight(), getMultiStaffLines(bGroup), 0);
                addBarMulti(stage, system, pos.x, absBarPos.y, rightWidth, bar.getHeight(), getMultiStaffLines(bGroup), 0);
                
                updateNumbers();
            }
        });
        
        bGroup.add(bar);
        
        if (nStaves > 1) {
            for (i = 0; i < lines.length; i++) {
                var barNum = Math.ceil(i / 2);
                var lineBar = bGroup.attrs.bars[barNum];
                var bottomLine = false;
                if ((i % 2) == 0) {
                    bottomLine = true;
                }
                addStaffLine(stage, bGroup, lines[i], w, h, lineBar, i, barNum, bottomLine, lines.length);
            }
        }
        
        // Number text in top-left corner of bar
        var barText = new Kinetic.Text({
            x: 0,
            y: 0,
            fontSize: textSize,
            fontFamily: "Calibri",
            textFill: "white",
            fill: 'black',
            text: number.toString(),
            align: 'center',
            padding: textPadding,
            name: "barnumber"
        });
        
        if (w < (barText.getTextWidth() + (textPadding * 2))) {
            barText.setFontSize(textSize * (w / (barText.getTextWidth() + 6)));
        }
        if (h < (barText.getTextHeight() + (textPadding * 2))) {
            barText.setFontSize(textSize * (h / (barText.getTextHeight() + 6)));
        }
        
        bGroup.add(barText);
        // Add anchors to bar
        addAnchorMulti(bGroup, invisiBox, 0, 0, "tl");
        addAnchorMulti(bGroup, invisiBox, w, 0, "tr");
        addAnchorMulti(bGroup, invisiBox, w, h, "lr");
        addAnchorMulti(bGroup, invisiBox, 0, h, "ll");
        // By adding group to layer, bars will not move when system is resized/relocated
        system.getLayer().add(bGroup);
    }
    
    // Generates an MEI-formatted time-based random UUID
    function genUUID() {
        return "m-" + uuid.v1();
    }
    
    // Returns the system with the given UUID tag
    function getSystemById(id) {
        var i;
        for (i = 0; i < systems.length; i++) {
            if (systems[i].attrs.id === id) {
                return systems[i];
            }
        }
        return null;
    }
    
    // Finds the nearest system to a given bar
    function findNearestSystem(barGroup) {
        var bar = barGroup.get(".bar")[0];
        var top = bar.getAbsolutePosition().y;
        var lower = top + bar.getHeight();
        
        var i;
        // Check the corners to see if any are contained in the bar
        for (i = 0; i < systems.length; i++) {
            if (((top > systems[i].getY()) &&
                 (top < systems[i].getY() + systems[i].attrs.height)) ||
                ((top > systems[i].getY()) &&
                 (top < systems[i].getY() + systems[i].attrs.height)) ||
                ((lower > systems[i].getY()) &&
                 (lower < systems[i].getY() + systems[i].attrs.height)) ||
                ((lower > systems[i].getY()) &&
                 (lower < systems[i].getY() + systems[i].attrs.height))) {
                return systems[i];
            }
        }
        // Find shortest corner distance to a system
        var distances = [];
        for (i = 0; i < systems.length; i++) {
            distances[4 * i] = Math.abs(top - systems[i].getY());
            distances[(4 * i) + 1] = Math.abs(top - (systems[i].getY() + systems[i].attrs.height));
            distances[(4 * i) + 2] = Math.abs(lower - systems[i].getY());
            distances[(4 * i) + 3] = Math.abs(lower - (systems[i].getY() + systems[i].attrs.height));
        }
        
        var minDist = Math.min.apply(Math, distances);
        
        for (i = 0; i < distances.length; i++) {
            if (distances[i] === minDist) {
                return systems[Math.floor(i / 4)];
            }
        }
        return null;
    }
    
    // Find the nearest system to a given y-coordinate.
    function findNearestSystemToPoint(y) {
        var distances = [];
        var i;
        for (i = 0; i < systems.length; i++) {
            distances[2 * i] = Math.abs(y - systems[i].getY());
            distances[(2 * i) + 1] = Math.abs(y - (systems[i].getY() + systems[i].attrs.height));
        }
        
        var minDist = Math.min.apply(Math, distances);
        
        for (i = 0; i < distances.length; i++) {
            if (distances[i] === minDist) {
                return systems[Math.floor(i / 2)];
            }
        }
        return null;
    }
    
    /* Resize/relocate a system to correctly bound its bars.
     * Used for maintaining system dimensions for bar-system membership detection
     * and MEI generation */
    function resizeSystem(system) {
        var bars = system.getLayer().get(".bar");
        var tlx = -1;
        var tly = -1;
        var lrx = -1;
        var lry = -1;
        var i;
        for (i = 0; i < bars.length; i++) {
            var barPos = bars[i].getAbsolutePosition();
            
            var rightX = barPos.x + bars[i].getWidth();
            var lowerY = barPos.y + bars[i].getHeight();
            if (tlx === -1 || barPos.x < tlx) {
                tlx = barPos.x;
            }
            if (tly === -1 || barPos.y < tly) {
                tly = barPos.y;
            }
            if (lrx === -1 || rightX > lrx) {
                lrx = rightX;
            }
            if (lry === -1 || lowerY > lry) {
                lry = lowerY;
            }
        }
        
        system.attrs.x = tlx;
        system.attrs.y = tly;
        system.attrs.width = lrx - tlx;
        system.attrs.height = lry - tly;
        /*
        // TEST CODE FOR VISIBLE SYSTEMS
        var tBox = system.get(".testbox")[0];
        tBox.setAbsolutePosition({
            x: tlx,
            y: tly
        });
        tBox.setWidth(lrx - tlx);
        tBox.setHeight(lry - tly);*/
        system.getLayer().draw();
    }
    
    /* Readjust bar so that the group is located at the top left anchor,
     * and all internal elements are oriented around (0,0).
     * Used for maintaining reliable box element positions and dimensions. */
    function refitBox(bGroup) {
        // The various components of a bar
        var topLeft = bGroup.get(".tl")[0];
        var topRight = bGroup.get(".tr")[0];
        var lowerRight = bGroup.get(".lr")[0];
        var lowerLeft = bGroup.get(".ll")[0];
        var bar = bGroup.get(".bar")[0];
        var iBox = bGroup.get(".barbox")[0];
        var barNumber = bGroup.get(".barnumber")[0];
        
        var tlPos = topLeft.getAbsolutePosition();
        var lrPos = lowerRight.getAbsolutePosition();
        
        var width = lrPos.x - tlPos.x;
        var height = lrPos.y - tlPos.y;
        
        // Reassign element positions
        bGroup.setPosition({
            x: tlPos.x,
            y: tlPos.y
        });
        barNumber.setPosition({
            x: 0,
            y: 0
        });
        bar.setPosition({
            x: 0,
            y: 0
        });
        iBox.setPosition({
            x: -barMargin,
            y: -barMargin
        });
        topLeft.setPosition({
            x: 0,
            y: 0
        });
        topRight.setPosition({
            x: width,
            y: 0
        });
        lowerRight.setPosition({
            x: width,
            y: height
        });
        lowerLeft.setPosition({
            x: 0,
            y: height
        });
        
        // Reassign element dimensions
        bar.setWidth(width);
        bar.setHeight(height);
        iBox.setWidth(width + (barMargin * 2));
        iBox.setHeight(height + (barMargin * 2));
        
        barNumber.setFontSize(textSize);
        if (width < (barNumber.getTextWidth() + 6)) {
            barNumber.setFontSize(textSize * (width / (barNumber.getTextWidth() + 6)));
        }
        if (height < (barNumber.getTextHeight() + 6)) {
            barNumber.setFontSize(textSize * (height / (barNumber.getTextHeight() + 6)));
        }
    }
    
    // Update the numbering of the bars on the page to be in the correct order
    function updateNumbers() {
        // Sort ranking function for sorting bars by x-coordinate
        var sortBarsByX = function(a, b) {
            return a.getX() - b.getX();
        };
        var currentNumber = minBar;
        var i, j, changed;
        for (i = 0; i < systems.length; i++) {
            // Sort bars by x-coordinate
            systems[i].attrs.bars = systems[i].attrs.bars.sort(sortBarsByX);
            changed = false;
            for (j = 0; j < systems[i].attrs.bars.length; j++) {
                // Reassign bar number if the current one is incorrect
                if (systems[i].attrs.bars[j].attrs.number !== currentNumber) {
                    changed = true;
                    systems[i].attrs.bars[j].attrs.number = currentNumber;
                    var barNumber = systems[i].attrs.bars[j].get(".barnumber")[0];
                    barNumber.setText(currentNumber.toString());
                }
                currentNumber++;
            }
            // Only redraw system if changes have occurred
            if (changed) {
                systems[i].getLayer().draw();
            }
        }
    }
    
    // Update a bar when an anchor is moved
    function update(group, activeAnchor) {
        var topLeft = group.get(".tl")[0];
        var topRight = group.get(".tr")[0];
        var lowerRight = group.get(".lr")[0];
        var lowerLeft = group.get(".ll")[0];
        var bar = group.get(".bar")[0];
        var iBox = group.get(".barbox")[0];
        topLeft.attrs.visible = true;
        topRight.attrs.visible = true;
        lowerRight.attrs.visible = true;
        lowerLeft.attrs.visible = true;
        // update anchor positions
        switch (activeAnchor.getName()) {
            case "tl":
                topRight.attrs.y = activeAnchor.attrs.y;
                lowerLeft.attrs.x = activeAnchor.attrs.x;
                break;
            case "tr":
                topLeft.attrs.y = activeAnchor.attrs.y;
                lowerRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "lr":
                lowerLeft.attrs.y = activeAnchor.attrs.y;
                topRight.attrs.x = activeAnchor.attrs.x;
                break;
            case "ll":
                lowerRight.attrs.y = activeAnchor.attrs.y;
                topLeft.attrs.x = activeAnchor.attrs.x;
                break;
        }
    
        var width = topRight.attrs.x - topLeft.attrs.x;
        var height = lowerLeft.attrs.y - topLeft.attrs.y;
    
        bar.setPosition(topLeft.attrs.x, topLeft.attrs.y);
        iBox.setPosition(topLeft.attrs.x - 5, topLeft.attrs.y - 5);
        if(width && height) {
            bar.setSize(width, height);
            iBox.setSize(width + 10, height + 10);
        }
    }
    
    // Add an anchor to a bar
    function addAnchor(group, iBox, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();

        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: "#666",
            fill: "#ddd",
            strokeWidth: 2,
            radius: 3,
            name: name,
            draggable: true,
            visible: false
        });
        
        // Update bar when moved
        anchor.on("dragmove", function() {
            update(group, this);
            layer.draw();
        });
        // Prevent event from bubbling up when anchor selected, move bar to top, hide bar number
        anchor.on("mousedown", function(e) {
            group.setDraggable(false);
            this.moveToTop();
            e.cancelBubble = true;
            var number = group.get(".barnumber")[0];
            number.attrs.visible = false;
        });
        // Update score information on dragend (bar/system fitting, bar numbers)
        anchor.on("dragend", function() {
            resizeSystem(group.getParent().get(".system")[0]);
            group.setDraggable(true);
            updateNumbers();
            refitBox(group);
            var number = group.get(".barnumber")[0];
            number.attrs.visible = true;
            layer.draw();
        });
        // Add hover styling
        anchor.on("mouseover", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "pointer";
            this.setStrokeWidth(4);
            layer.draw();
        });
        // Restore hover styling on mouseout
        anchor.on("mouseout", function() {
            var layer = this.getLayer();
            document.body.style.cursor = "move";
            this.setStrokeWidth(2);
            layer.draw();
        });
        // Keep anchor visible during drag
        group.on("mouseover dragmove", function() {
            anchor.attrs.visible = true;
            anchor.getLayer().draw();
        });
        // Hide anchors when mouse leaves bar
        group.on("mouseout", function() {
            anchor.attrs.visible = false;
            anchor.getLayer().draw();
        });
        group.add(anchor);
    }
    
    // Add a bar to a system
    function addBar(stage, system, x, y, w, h, number, id, facs) {
        if (id === undefined) {
            id = genUUID();
        }
        if (facs === undefined) {
            facs = genUUID();
        }
        
        var bGroup = new Kinetic.Group({
            x: x,
            y: y,
            draggable: true,
            name: "bargroup",
            number: number,
            id: id,
            facs: facs
        });
        
        // Insert bar into correct position in system's bars list
        var i = 0;
        for (i = 0; i < system.children.length; i++) {
            if (system.children[i].getX() > x) {
                system.attrs.bars.splice(i, 0, bGroup);
                break;
            }
        }
        if (i === system.children.length) {
            system.attrs.bars.push(bGroup);
        }
        
        system.add(bGroup);
        
        // Detection box for bar, coloured near-transparent orange (for now)
        var invisiBox = new Kinetic.Rect({
            x: -barMargin,
            y: -barMargin,
            width: w + (barMargin * 2),
            height: h + (barMargin * 2),
            fill: 'orange',
            alpha: 0.05,
            name: "barbox"
        });
        bGroup.add(invisiBox);
        
        // Number text in top-left corner of bar
        var barText = new Kinetic.Text({
            x: 0,
            y: 0,
            fontSize: textSize,
            fontFamily: "Calibri",
            textFill: "white",
            fill: 'black',
            text: number.toString(),
            align: 'center',
            padding: textPadding,
            name: "barnumber"
        });
        
        if (w < (barText.getTextWidth() + (textPadding * 2))) {
            barText.setFontSize(textSize * (w / (barText.getTextWidth() + 6)));
        }
        if (h < (barText.getTextHeight() + (textPadding * 2))) {
            barText.setFontSize(textSize * (h / (barText.getTextHeight() + 6)));
        }
        
        bGroup.add(barText);
        
        // Actual bar box
        var bar = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: w,
            height: h,
            fill: '',
            stroke: 'red',
            strokeWidth: 2,
            name: "bar"
        });
        
        // Split bar if shift-clicked, splitting at location of click
        bar.on("click", function(e) {
            if (e.shiftKey) {
                var pos = stage.getMousePosition(e);
                var absBarPos = bar.getAbsolutePosition();
                var leftWidth = pos.x - absBarPos.x;
                var rightWidth = absBarPos.x + bar.getWidth() - pos.x;
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                addBar(stage, system, absBarPos.x, absBarPos.y, leftWidth, bar.getHeight(), 0);
                addBar(stage, system, pos.x, absBarPos.y, rightWidth, bar.getHeight(), 0);
                updateNumbers();
            }
        });
        
        
        
        bGroup.add(bar);
        
        // Pointer styling
        bGroup.on("mouseover", function() {
            this.moveToTop();
            document.body.style.cursor = "move";
        });
        bGroup.on("mouseout", function() {
            document.body.style.cursor = "default";
        });
        // Delete bar if alt-clicked, then re-number and update systems
        bGroup.on("click", function(e) {
            if (e.altKey) {
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                updateNumbers();
                resizeSystem(system);
            }
        });
        // Recalculate system membership, and system size on dragend
        bGroup.on("dragend", function(e) {
            var nearSystem = findNearestSystem(this);
            // If the nearest system is not the bar's current system, reassign membership
            if (nearSystem !== system) {
                system.getLayer().remove(bGroup);
                system.attrs.bars.splice(system.attrs.bars.indexOf(bGroup), 1);
                addBar(stage, nearSystem, bGroup.getX(), bGroup.getY(), bar.getWidth(), bar.getHeight(), 0);
                resizeSystem(nearSystem);
            }
            updateNumbers();
            resizeSystem(system);
            system.getLayer().draw();
            system = nearSystem;
        });
        
        // Add anchors to bar
        addAnchor(bGroup, invisiBox, 0, 0, "tl");
        addAnchor(bGroup, invisiBox, w, 0, "tr");
        addAnchor(bGroup, invisiBox, w, h, "lr");
        addAnchor(bGroup, invisiBox, 0, h, "ll");
        
        // By adding group to layer, bars will not move when system is resized/relocated
        system.getLayer().add(bGroup);
    }
    
    function generateMEI() {
        var i, j, bars;
        var outMEI = "";
        outMEI += "<mei xml:id=\"" + genUUID() + "\" meiversion\"2012\">";
            outMEI += "<meiHead xml:id=\"" + genUUID() + "\"/>";
            outMEI += "<music xml:id=\"" + genUUID() + "\">";
                outMEI += "<facsimile xml:id=\"" + genUUID() + "\">";
                    outMEI += "<surface xml:id=\"" + genUUID() + "\">";
                        for (i = 0; i < systems.length; i++) {
                            outMEI += "<zone xml:id=\"" + systems[i].attrs.facs + "\" ";
                            outMEI += "ulx=\"" + systems[i].attrs.x + "\" ";
                            outMEI += "uly=\"" + systems[i].attrs.y + "\" ";
                            outMEI += "lrx=\"" + (systems[i].attrs.x + systems[i].attrs.width) + "\" ";
                            outMEI += "lry=\"" + (systems[i].attrs.y + systems[i].attrs.height) + "\"";
                            outMEI += "/>";
                        }/*
                        UPDATE WITH NEW MEI
                        for (i = 0; i < systems.length; i++) {
                            bars = systems[i].attrs.bars;
                            for (j = 0; j < bars.length; j++) {
                                var barPos = bars[i].getAbsolutePosition();
                                outMEI += "<zone xml:id=\"" + bars[i].attrs.facs + "\" ";
                                outMEI += "ulx=\"" + barPos.x + "\" ";
                                outMEI += "uly=\"" + barPos.y + "\" ";
                                outMEI += "lrx=\"" + (barPos.x + bars[i].getWidth()) + "\" ";
                                outMEI += "lry=\"" + (barPos.y + bars[i].getHeight()) + "\"";
                                outMEI += "/>";
                            }
                        }*/
                    outMEI += "</surface>";
                outMEI += "</facsimile>";
                outMEI += "<layout xml:id=\"" + genUUID() + "\">";
                    outMEI += "<page xml:id=\"" + genUUID() + "\">";
                        for (i = 0; i < systems.length; i++) {
                            outMEI += "<system xml:id=\"" + systems[i].attrs.id + "\" facs=\"" + systems[i].attrs.facs + "\"/>";
                        }
                    outMEI += "</page>";
                outMEI += "</layout>";
                outMEI += "<body xml:id=\"" + genUUID() + "\">";
                    outMEI += "<mdiv xml:id=\"" + genUUID() + "\">";
                        outMEI += "<score xml:id=\"" + genUUID() + "\">";
                            outMEI += "<scoreDef xml:id=\"" + genUUID() + "\">";
                                outMEI += "<staffGrp xml:id=\"" + genUUID() + "\">";
                                    outMEI += "<staffDef xml:id=\"" + genUUID() + "\" n=\"1\"/>";
                                outMEI += "</staffGrp>";
                            outMEI += "</scoreDef>";
                            outMEI += "<section xml:id=\"" + genUUID() + "\">";
                                outMEI += "<staff xml:id=\"" + genUUID() + "\" n=\"1\">";
                                    outMEI += "<layer xml:id=\"" + genUUID() + "\" n=\"1\">";
                                        //UPDATE WITH NEW MEI
                                    outMEI += "</layer>";
                                outMEI += "</staff>";
                            outMEI += "</section>";
                        outMEI += "</score>";
                    outMEI += "</mdiv>";
                outMEI += "</body>";
            outMEI += "</music>";
        outMEI += "</mei>";
    }
    
    // Setup
    imageObj.onload = function () {
        var scaleVal = iWidth / imageObj.width;
        
        var stage = new Kinetic.Stage({
            container: 'imview',
            width: iWidth,
            height: imageObj.height * scaleVal
        });
        
        scaleVal = iWidth / imageObj.width;
        
        var img = new Kinetic.Image({
            x: 0,
            y: 0,
            width: iWidth,
            height: imageObj.height * scaleVal,
            image: imageObj
        });
        
        var iLayer = new Kinetic.Layer();
        iLayer.add(img);
        stage.add(iLayer);
        
        // Parse MEI to build object system
        $.get('static/mei/detmoldbars2.mei', function(data) {
            var meiDoc = $.parseXML(data);
            var mei = $(meiDoc);
            
            var currSystem = new Kinetic.Group({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                name: "system",
                bars: []
            });
            systems.push(currSystem);
            var layer = new Kinetic.Layer();
            layer.add(currSystem);
            stage.add(layer);
            
            mei.find("section").children().each(function() {
                
                if ($(this).is("sb")) {
                    //resizeSystem(currSystem);
                    currSystem = new Kinetic.Group({
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                        name: "system",
                        bars: []
                    });
                    systems.push(currSystem);
                    layer = new Kinetic.Layer();
                    layer.add(currSystem);
                    stage.add(layer);
                } else {
                    var facs = $(this).attr("facs");
                    var zone = mei.find('[xml\\:id="' + facs + '"]');
                    var ulX = zone.attr("ulx") * scaleVal;
                    var ulY = zone.attr("uly") * scaleVal
                    var width = (zone.attr("lrx") * scaleVal) - ulX;
                    var height = (zone.attr("lry") * scaleVal) - ulY;
                    console.log(ulX, ulY, ulX + width, ulY + height);
                    
                    var staves = $(this).children();
                    var nStaves = staves.size();
                    var staffEnds = [];
                    var currStaff = 1;
                    staves.each(function(staff) {
                        var staffFacs = $(this).attr("facs");
                        var staffZone = mei.find('[xml\\:id="' + staffFacs + '"]');
                        staffEnds.push((staffZone.attr("uly") * scaleVal) - ulY);
                        staffEnds.push((staffZone.attr("lry") * scaleVal) - ulY);
                        
                        
                        /*
                        if (currStaff == 1) {
                            staffEnds.push((staffZone.attr("lry") * scaleVal) - ulY);
                            console.log((staffZone.attr("lry")), ulY);
                        } else if (currStaff == nStaves) {
                            staffEnds.push((staffZone.attr("uly") * scaleVal) - ulY);
                            console.log((staffZone.attr("uly")), ulY + height);
                        } else {
                            staffEnds.push((staffZone.attr("uly") * scaleVal) - ulY);
                            staffEnds.push((staffZone.attr("lry") * scaleVal) - ulY);
                        }*/
                        //currStaff++;
                    });
                    staffEnds.sort(function(a,b){return a-b});
                    staffEnds.splice(staffEnds.length - 1, 1);
                    staffEnds.splice(0, 1);
                    addBarMulti(stage, currSystem, ulX, ulY, width, height, staffEnds, $(this).attr("n"));
                }
            });
            //resizeSystem(currSystem);
            
            
            
            /*
            
            mei.find("system").each(function() {
                var facs = $(this).attr("facs");
                var zone = mei.find('[xml\\:id="' + facs + '"]');
                systems.push(new Kinetic.Group({
                    x: zone.attr("ulx") * scaleVal,
                    y: zone.attr("uly") * scaleVal,
                    width: (zone.attr("lrx") - zone.attr("ulx")) * scaleVal,
                    height: (zone.attr("lry") - zone.attr("uly")) * scaleVal,
                    facs: facs,
                    id: $(this).attr("xml:id"),
                    name: "system",
                    bars: []
                }));
            });
            
            var i;
            for (i = 0; i < systems.length; i++) {
                var layer = new Kinetic.Layer();
                layer.add(systems[i]);
                stage.add(layer);
            }
            
            var barNumber = minBar;
            var currSystem = null;
            var prevX = 0;
            var prevY = 0;
            mei.find("layer").children().each(function() {
                if ($(this).is("sb")) {
                    var systemref = $(this).attr("systemref");
                    currSystem = getSystemById(systemref);
                    prevX = currSystem.getX();
                    prevY = currSystem.getY();
                } else if (currSystem !== null) {
                    var facs = $(this).attr("facs");
                    var zone = mei.find('[xml\\:id="' + facs + '"]');
                    var width = (zone.attr("lrx") * scaleVal) - prevX;
                    var height = (zone.attr("lry") * scaleVal) - prevY;
                    
                    //addBar(stage, currSystem, prevX, prevY, width, height, barNumber++);
                    //addBarMulti(stage, currSystem, prevX, prevY, width, height, [6, 12, 18, 24], barNumber++);
                    
                    prevX += width;
                    prevY = (zone.attr("uly") * scaleVal);
                }
            });
            addBarMulti(stage, systems[0], 100, 100, 500, 500, [100, 200, 300, 400], 1);
            */
            stage.draw();
        });
        
        // Add new bar on shift-click
        img.on("click", function(e) {
            if (e.shiftKey) {
                //Add new bar, 25x25, calculate system membership
                var pos = stage.getMousePosition(e);
                var nearSystem = findNearestSystemToPoint(pos.y);
                addBar(stage, nearSystem, pos.x, pos.y, 25, 25, 0);
                resizeSystem(nearSystem);
                updateNumbers();
            }
        });
        // Cursor styling reset
        img.on("mouseover", function() {
            document.body.style.cursor = "default";
        });
        
        //Submission Function: Turn everything into MEI
        
    };
    // Assigning image source triggers image load
    imageObj.src = 'static/images/C_07a_ED-Kl_1_A-Wn_SHWeber90_S_009.jpg';
};
